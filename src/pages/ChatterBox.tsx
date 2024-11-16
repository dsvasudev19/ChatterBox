
import { Search, Send, MoreVertical, Phone, Video, ImagePlus, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { axiosInstance } from '../../axiosIntance';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import socket from "./../../socket";
import toast from 'react-hot-toast';
import axios from 'axios';

const ChatterBox = () => {
  const { user, loading } = useAuth();
  const [chats, setChats] = useState<any>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any>([]);
  const navigate = useNavigate();
  const messagesEndRef = useRef<any>(null);
  const chatContainerRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  
  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isAtBottom = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const threshold = 100; // pixels from bottom
      return container.scrollHeight - container.scrollTop - container.clientHeight <= threshold;
    }
    return true;
  };

  const getAllChatsOfUser = async () => {
    try {
      const res = await axiosInstance.get(`/chat/user/${user.id}`);
      if (res.status === 200) {
        setChats(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChatMessages = async (chatId: string) => {
    try {
      const res = await axiosInstance.get(`/message/${chatId}`);
      if (res.status === 200) {
        setChatMessages(res.data.data);
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Memoize the message handler to prevent unnecessary recreations
  const handleNewMessage = useCallback((message: any) => {
    if (message.senderId !== user.id) {
      const wasAtBottom = isAtBottom();
      setChatMessages((prevMessages: any) => [...prevMessages, {...message,createdAt: new Date()}]);

      if (wasAtBottom) {
        setTimeout(scrollToBottom, 100);
      }
    }
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      // Get initial messages
      getChatMessages(selectedChat.id);

      // Join the chat room
      socket.emit("join", { chatId: selectedChat.id });

      // Set up socket listener
      socket.on("receiveMessage", handleNewMessage);

      // Cleanup function
      return () => {
        socket.off("receiveMessage", handleNewMessage);
        socket.emit("leave", { chatId: selectedChat.id }); // Add a leave event if needed
      };
    }
  }, [selectedChat, handleNewMessage]);

  useEffect(() => {
    if (user) {
      getAllChatsOfUser();
    }
  }, [user, loading]);

  useEffect(() => {
    if (loading) return;
    if (!user && !loading) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const formatMessageDate = (createdAt: any) => {
    const messageDate: any = new Date(createdAt);
    const today: any = new Date();
    const dateDifference = Math.floor((today - messageDate) / (1000 * 60 * 60 * 24));

    if (dateDifference === 0) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (dateDifference === 1) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const postMessage = async (values: any, { resetForm }: any) => {
    try {
      const message:any = {
        senderId: user.id,
        message: values.message,
        chatId: selectedChat.id,
        createdAt: new Date(),
        attachment: null 
      };
      
      if (!values.image) {
        setChatMessages((prevMessages: any) => [...prevMessages, message]);
      }
      if(values.image){
        message.attachment = "/2-cloud-upload.gif";
      }
      setChatMessages((prevMessages: any) => [...prevMessages, message]);
  
      let formData;
      if (values.image) {
        formData = new FormData();
        formData.append('file', values.image);
        formData.append('upload_preset', 'chatterbox'); 
        formData.append('cloud_name', 'your_cloud_name');  
      }
  
      // Upload image if present
      let uploadedImageUrl = null;
      if (values.image) {
        try {
          const res = await axios.post('https://api.cloudinary.com/v1_1/dp8bdt1zu/image/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (res.status === 200) {
            uploadedImageUrl = res.data.secure_url; 
  
            message.attachment = uploadedImageUrl;
            setChatMessages((prevMessages: any) => [...prevMessages.slice(0, -1), message]);
          }
        } catch (error) {
          console.log(error);
        } 
      }
  
      // Send message with or without image attachment
      const messageToSend = { 
        ...message, 
        attachment: uploadedImageUrl || message.attachment
      };
  
      const response = await axiosInstance.post('/message', messageToSend);
  
      if (response.status === 200) {
        // Emit the message to socket
        socket.emit('privateMessage', {
          chatId: selectedChat.id,
          message: values.message,
          senderId: user.id,
          attachment: messageToSend.attachment,  
        });
  
        resetForm();
      }
    } catch (error) {
      // If error occurs, you might want to remove the optimistically added message
      setChatMessages((prevMessages: any) => prevMessages.slice(0, -1));
      console.error('Error sending message:', error);
    }
  };
  
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (username.length > 0) {
        setSuggestionsLoading(true);
        try {
          // Fetch user suggestions from backend
          const response = await axiosInstance.get('/user/search/'+username);
          setSuggestions(response.data.data);  
        } catch (err) {
          console.log(err);
        } finally {
          setSuggestionsLoading(false);
        }
      } else {
        setSuggestions([]);  
      }
    }, 300);  

    return () => clearTimeout(debounceTimeout);  
  }, [username]);

  return (
    <>
      {loading ? <div>Loading....</div> : (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Left Sidebar */}
          <div className="w-80 bg-white shadow-lg rounded-l-xl flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"> 
                <a href="/">ChatterBox</a>
              </h2>
              
              <div className="relative">
                <Plus
                  className="w-6 h-6 text-gray-500 cursor-pointer hover:text-green-500 transition-colors"
                  onClick={() => setShowModal(true)}
                />
                {showModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Add New Chat</h3>
                        <X
                          className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-500"
                          onClick={() => setShowModal(false)}
                        />
                      </div>
                      <Formik
                        initialValues={{ name: '', username: '', participantId: '' }}
                        onSubmit={async (values) => {
                          const existingChat = chats.find((chat:any) => chat.participantId === values.participantId);
                          if(existingChat){
                            setSelectedChat(existingChat);
                            toast.error("Chat already exists")
                          }else{
                            try {
                              const res = await axiosInstance.post(`/chat/${user.id}`, {
                                name: values.name,
                                participantId: values.participantId
                              });
                              setSelectedChat(res.data.data);
                              setChats((prevChats:any) => [...prevChats, res.data.data]);
                              toast.success("Chat created successfully");
                            } catch (error) {
                              console.log(error);
                            }finally{
                              setShowModal(false);
                            }
                          }
                          
                        }}
                      >
                        {({setFieldValue }) => (
                          <Form className="space-y-4">
                            <div className="space-y-2">
                              <Field
                                name="name"
                                type="text"
                                placeholder="Chat Name"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                              />
                              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="space-y-2">
                              <div className="relative">
                                <Field
                                  name="username"
                                  type="text"
                                  placeholder="Search Username"
                                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                  onChange={async (e: any) => {
                                    const value = e.target.value;
                                    setUsername(value); 
                                    setFieldValue('username', value);  
                                  }}
                                />
                                {/* Loading indicator */}
                                {suggestionsLoading && (
                                  <div className="absolute top-0 right-0 p-2 text-gray-500">Loading...</div>
                                )}
                                {/* Display suggestions */}
                                {suggestions.length > 0 && (
                                  <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-auto z-10">
                                    {suggestions.map((user:any) => (
                                      <li
                                        key={user.id}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                          setUsername(user.username);  
                                          setFieldValue('username', user.username);  
                                          setFieldValue('participantId', user.id);
                                          setSuggestions([]);  
                                        }}
                                      >
                                        {user.username}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button
                              type="submit"
                              className="w-full p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                            >
                              Create Chat
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex flex-col h-full">
              {/* Scrollable Chat List */}
              <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
                {chats?.map((chat: any) => (
                  <div
                    key={chat.id}
                    className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors relative mb-2 mx-2 rounded-xl shadow-sm hover:shadow-md hover:bg-gradient-to-r from-blue-50 to-green-50 ${selectedChat?.id === chat.id ? "bg-gradient-to-r from-blue-50 to-green-50" : ""}`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="relative">
                      <div className={`h-12 w-12 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform bg-gray-100`}>
                        <span className="text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                      </div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                        <span className="text-sm text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* User Profile Section - Fixed at Bottom */}
              <div className="border-t border-gray-100 p-4 bg-white mt-auto">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-100 to-green-100 shadow-lg flex items-center justify-center">
                    <span className="text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">{user?.username}</p>
                    <p className="text-sm text-gray-500">{user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-white rounded-r-xl shadow-lg">

            {
              selectedChat ? (
                <>
                  <div className="p-4 border-b border-gray-100 bg-white rounded-tr-xl flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-100 to-green-100 shadow-lg flex items-center justify-center">
                          <span className="text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </span>
                        </div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-800">{selectedChat?.name}</h3>
                        <p className="text-sm text-green-500">Online</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Phone className="w-6 h-6 text-gray-500 cursor-pointer hover:text-purple-500 transition-colors" />
                      <Video className="w-6 h-6 text-gray-500 cursor-pointer hover:text-purple-500 transition-colors" />
                      <MoreVertical className="w-6 h-6 text-gray-500 cursor-pointer hover:text-purple-500 transition-colors" />
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {chatMessages?.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                            message.senderId === user.id
                              ? 'bg-gradient-to-r from-blue-100 to-green-100 rounded-tr-none'
                              : 'bg-white text-gray-800 rounded-tl-none'
                          }`}
                        >
                          {message.attachment && (
                            <div className="mb-2 border-b border-gray-900">
                              {message.attachment && (
                                <>
                                  <img 
                                    src={message.attachment} 
                                    alt="Attachment" 
                                    className="rounded-lg max-w-[300px] hover:opacity-90 transition-opacity cursor-pointer"
                                    onClick={() => {
                                      const modalDiv = document.createElement('div');
                                      modalDiv.innerHTML = `
                                        <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                                          <div class="relative w-[50vw] h-[70vh] bg-white rounded-lg p-4">
                                            <button class="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                              </svg>
                                            </button>
                                            <div class="w-full h-full flex items-center justify-center">
                                              <img 
                                                src="${message.attachment}" 
                                                alt="Full size attachment" 
                                                class="max-w-full max-h-full object-contain"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      `;
                                      
                                      document.body.appendChild(modalDiv);
                                      
                                      const closeBtn = modalDiv.querySelector('button');
                                      const modalOverlay = modalDiv.querySelector('div');
                                      if (closeBtn) {
                                        closeBtn.onclick = () => document.body.removeChild(modalDiv);
                                      }
                                      if (modalOverlay) {
                                        modalOverlay.onclick = (e) => {
                                          if (e.target === modalOverlay) {
                                            document.body.removeChild(modalDiv);
                                          }
                                        };
                                      }
                                    }}
                                  />
                                </>
                              )}
                            </div>
                          )}
                          
                          <p className="text-[15px] leading-relaxed">{message.message}</p>
                          
                          <span 
                            className={`text-xs mt-2 block ${
                              message.senderId === user.id ? 'text-gray-800' : 'text-gray-400'
                            }`}
                          >
                            {formatMessageDate(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 bg-white rounded-br-xl border-t border-gray-100">
                    <Formik
                      initialValues={{ message: '', image: null }}
                      validationSchema={Yup.object({
                        message: Yup.string().required('Message is required')
                      })}
                      onSubmit={postMessage}
                    >
                      {({ setFieldValue ,values}) => (
                        <Form className="flex items-center space-x-4" >
                          <button type="button" className="p-2 text-gray-500 hover:text-green-500 transition-colors">
                            <input 
                              type="file"
                              id="imageInput"
                              className="hidden"
                              accept="image/*"
                              onChange={(event) => {
                                const file = event.currentTarget.files?.[0];
                                setFieldValue('image', file);
                              }}
                            />
                            <label htmlFor="imageInput">
                              {values.image ? (
                                <div className="flex items-center">
                                  <span className="text-sm text-green-500 mr-1">Image selected</span>
                                  <X 
                                    className="w-4 h-4 cursor-pointer text-red-500"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setFieldValue('image', null);
                                    }}
                                  />
                                </div>
                              ) : (
                                <ImagePlus className="w-6 h-6 cursor-pointer" />
                              )}
                            </label>
                          </button>
                          <Field
                            name="message"
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 p-3 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                          />
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="absolute bottom-full left-0 text-red-500 text-sm"
                          />
                          <button
                            type="submit"
                            className="p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </>
              ) : <div className='flex justify-center items-center h-full'>Select a chat to start messaging</div>
            }

          </div>
        </div>)}
    </>
  );
};

export default ChatterBox;