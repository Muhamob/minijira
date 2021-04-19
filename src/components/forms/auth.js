import { Button, FormControl, FormGroup, TextField, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const AuthenticationForm = (props) => {
  const [state, setState] = useState({})
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('State:', state)

    history.push('/boards')
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
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
