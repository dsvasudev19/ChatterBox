import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../axiosIntance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../../contexts/AuthContext';
import { useEffect } from 'react';
import CircleChatSpinner from '../../components/CircleChatSpinner';
const Login = () => {
  const router = useNavigate();
  const { loading, user } = useAuth();

  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const res = await axiosInstance.post('/auth/login', values);
      if (res.status === 200) {
        toast.success("Logged in successfully");
        router('/chat');
      }
    } catch (error) {
      console.log(error)
    } finally {
      resetForm();
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router('/chat');
    }
  }, [loading, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">Please sign in to continue</p>
        </div>

        {
          loading ? <div className='flex justify-center items-center h-full'><CircleChatSpinner /></div> : (<div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02]"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <a href="register" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up
              </a>
            </p>
          </div>)}
      </div>
    </div>
  );
};

export default Login;
