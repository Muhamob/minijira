import AuthenticationForm from '../forms/auth'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

const AuthPage = (props) => {
  return <QueryClientProvider client={queryClient}>
    <AuthenticationForm />
  </QueryClientProvider>
}

export default AuthPage
