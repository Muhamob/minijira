import RegisterForm from '../forms/register'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

const RegisterPage = (props) => {
  return <QueryClientProvider client={queryClient}>
    <RegisterForm />
  </QueryClientProvider>
}

export default RegisterPage
