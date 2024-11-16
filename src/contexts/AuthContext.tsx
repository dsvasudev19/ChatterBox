import { createContext,useContext,useState,useEffect } from "react";
import axiosInstance from "../../axiosIntance";
import toast from "react-hot-toast";

export const AuthContext=createContext({});

export const AuthProvider=({children}:{children:React.ReactNode})=>{
    const [authenticated,setAuthenticated]=useState({});
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(null);


    const login=async(data:any)=>{
        try {
            const res=await axiosInstance.post('/auth/login',data);
            if(res.status===200){
                setUser(res.data.user);
            }
        } catch (error:any) {
            console.log(error)
            throw new Error(error);
        }
    }


    const register=async(data:any)=>{
        try {
            const res=await axiosInstance.post('/auth/register',data);
            if(res.status===200){
                toast.success("Registered successfully");
            }
        } catch (error:any) {
            console.log(error)
            throw new Error(error);
        }
    }

    const getUserByToken=async()=>{
        try {
            // setLoading(true);
            const res=await axiosInstance.get('/auth/user/by/token');
            if(res.status===200){
                setUser(res.data.data);
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

    const logout=async()=>{
        try {
            const res=await axiosInstance.get('/auth/logout');
            if(res.status===200){
                setUser(null);
                setAuthenticated(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUserByToken();
    },[])



    return <AuthContext.Provider value={{authenticated,setAuthenticated,loading,setLoading,user,setUser,login,register,logout}}>{children}</AuthContext.Provider>
}

export const useAuth:any=()=>{
    const context=useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}