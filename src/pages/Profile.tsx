
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Edit,
  Key,
  LogOut
} from 'lucide-react';

const ProfilePage = () => {
  // Sample user data - in real app, this would come from props or context
  const user = {
    name: 'Sarah Anderson',
    email: 'sarah.anderson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    company: 'Tech Innovations Inc.',
    joinDate: 'January 2023'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile Settings</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Information Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Personal Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-800 font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Phone className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-800 font-semibold">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-gray-800 font-semibold">{user.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Building className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-gray-800 font-semibold">{user.company}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-gray-800 font-semibold">{user.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Picture and Actions Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mb-6">
                <User className="w-16 h-16 text-white" />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
              <p className="text-gray-500 mb-8">{user.company}</p>

              <div className="w-full space-y-4">
                {/* Edit Profile Button */}
                <button 
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>

                {/* Change Password Button */}
                <button 
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </button>

                {/* Logout Button */}
                <button 
                  className="w-full flex items-center justify-center px-4 py-2 bg-red-400 hover:from-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;