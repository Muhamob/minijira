import { Button, FormControl, FormGroup, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useFormData } from './hooks'
import { setAccessToken } from '../../utils/auth'
import { loginUserRequest } from '../../api/register'

const AuthenticationForm = (props) => {
  const history = useHistory()
  const [state, handleChange] = useFormData()
  const mutation = useMutation(state => loginUserRequest(state,
    {
      onSuccess: (data, variables, context) => {
        setAccessToken(data.data.accessToken)
      },
      onError: (error, variables, context) => {
        console.log(error)
      }
    }))

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
  if (mutation.isSuccess) {
    history.push('/boards')
  }

  return <form onSubmit={handleSubmit}>
        <Typography variant="h3">
            Sign in
        </Typography>
        <FormGroup>
            <FormControl>
                <TextField id="username" label="username" value={state?.username} onChange={handleChange}/>
            </FormControl>
            <FormControl>
                <TextField type='password' id="password" label="password" value={state?.password} onChange={handleChange}/>
            </FormControl>
        </FormGroup>
        <Button type="submit">Sign in</Button>
    </form>
}

export default AuthenticationForm
