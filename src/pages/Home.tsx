import { MessageCircle, Users, Shield, Zap, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import {useAuth} from './../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const {user,loading} = useAuth();
  const navigate = useNavigate();
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Real-time Messaging",
      description: "Experience instant message delivery with real-time sync across all your devices."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Chats",
      description: "Create groups for teams, friends, or communities with advanced management tools."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "End-to-end encryption ensures your conversations stay private and secure."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance ensures smooth communication even with slow connections."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your account in seconds with just your email."
    },
    {
      step: "2",
      title: "Connect",
      description: "Find your friends or team members and start chatting."
    },
    {
      step: "3",
      title: "Collaborate",
      description: "Share messages, files, and collaborate in real-time."
    }
  ];

  return (
    
    <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                ChatterBox
              </span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
            <div className="flex items-center gap-4">
              <a href={user ? "/chat" : "/login"} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MessageCircle className="w-5 h-5" />
                Go to Chat
              </a>
              
              {user ? (
                <div className="relative group">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-100 to-green-100 shadow-sm flex items-center justify-center cursor-pointer">
                    <span className="text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">Profile Settings</a>
                    <a href="/account" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">Account Settings</a>
                    <hr className="my-2" />
                    <a href="/logout" className="block px-4 py-2 text-red-600 hover:bg-red-50">Logout</a>
                  </div>
                </div>
              ) : (
                <a href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Sign Up
                </a>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Communication Made Simple for Everyone
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with your team, friends, and community through instant messaging that's fast, secure, and reliable.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                Get Started Free <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the features that make our messaging platform stand out from the rest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started with our platform in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of users who trust our platform for their communication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/register')} className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                Create Free Account <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Trusted by Teams Worldwide</h2>
                <div className="space-y-4">
                  {[
                    "99.9% Uptime guarantee",
                    "24/7 Customer support",
                    "Enterprise-grade security",
                    "Flexible pricing plans"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 p-8 rounded-xl">
                <blockquote className="text-gray-700 text-lg italic">
                  "This platform has transformed how our team communicates. It's intuitive, fast, and secure - everything we needed in a messaging solution."
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-600">CTO at TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">ChatterBox</span>
            </div>
            <p className="text-gray-400">
              Connecting people through seamless communication.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Security</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Enterprise</a></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Careers</a></li> */}
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ChatterBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Home;