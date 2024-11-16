import * as yup from 'yup';
import {Form, Field, ErrorMessage, Formik } from 'formik';
import {axiosInstance} from './../../../axiosIntance'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup 
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const initialValues = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
  const router=useNavigate();
  const handleSubmit = async (values:any,{resetForm}:any) => {
    const registerToast=toast.loading("Creating account...")
    try {
      const res=await axiosInstance.post('/auth/register',values);
      if(res.status===200){
        toast.success("Account created successfully",{
          id:registerToast
        });
      }
      router('/login');
    } catch (err) {
      toast.error("Something went wrong",{
        id:registerToast
      });
    }finally{
      resetForm();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">Join our community today</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-600" />
            </div>

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
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter username"
                required
              />
              <ErrorMessage name="username" component="p" className="mt-1 text-sm text-red-600" />
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
                placeholder="Create a password"
              />
              <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Confirm your password"
              />
              <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02]"
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
