
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile Settings</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Information Card */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="text-blue-500 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-800">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-500 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-500 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-800">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-500 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-800">{user.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="text-blue-500 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="text-gray-800">{user.company}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="text-blue-500 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-gray-800">{user.joinDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Picture and Actions Card */}
          <Card className="shadow-lg">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mb-6">
                <User className="w-16 h-16 text-white" />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
              <p className="text-gray-500 mb-8">{user.company}</p>

              <div className="w-full space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>

                <Button 
                  variant="destructive"
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;