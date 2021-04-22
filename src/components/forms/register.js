import { Button, FormControl, FormGroup, TextField, Typography } from '@material-ui/core'
import { useMutation } from 'react-query'
// import { useHistory } from 'react-router-dom'
import { setAccessToken } from '../../utils/auth'
import { registerUserRequest } from '../../api/register'
import { useFormData } from './hooks'

const RegisterForm = (props) => {
  // const history = useHistory()
  const [state, handleChange] = useFormData()
  const mutation = useMutation(state => registerUserRequest(state), {
    onSuccess: (data, variables, context) => {
      console.log('Recieved token', data.data.accessToken)
      setAccessToken(data.data.accessToken)
    },
    onError: (error, variables, context) => {
      console.log(error)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state)
    mutation.mutate(state)
  }

  if (mutation.isError) {
    return <Typography variant="h3">
          <span color="red">Error</span>
      </Typography>
  }

  if (mutation.isLoading) {
    return <Typography variant="h3">
        <span color="yellow">Loading</span>
    </Typography>
  }
  // if (mutation.isSuccess) {
  // history.push('/boards')
  // }

  return <form onSubmit={handleSubmit}>
        <Typography variant="h3">
            Sign up
        </Typography>
        <FormGroup>
            <FormControl>
                <TextField id="name" label="name" value={state?.name} onChange={handleChange}/>
            </FormControl>
            <FormControl>
                <TextField id="email" label="email" value={state?.email} onChange={handleChange}/>
            </FormControl>
            <FormControl>
                <TextField type="password" id="password" label="password" value={state?.password} onChange={handleChange}/>
            </FormControl>
        </FormGroup>
        <Button type="submit">Sign up</Button>
    </form>
}

export default RegisterForm
