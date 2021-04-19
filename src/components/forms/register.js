import { Button, FormControl, FormGroup, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import { API_URL } from '../boards/constants'

const RegisterForm = (props) => {
  const [state, setState] = useState({})
  const history = useHistory()
  const mutation = useMutation(state => axios.post(API_URL + '/auth/register', state, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  {
    onSuccess: (data, variables, context) => {
        setAccessToken(data.data.accessToken)
    },
    onError: (error, variables, context) => {
      console.log(error)
    }
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

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
