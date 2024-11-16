
import Router from './../Router'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <Toaster position='top-right' reverseOrder={false} />
        <Router />
      </AuthProvider>
    </>
  )
}

export default App
