import { Button, FormControl, FormGroup, TextField, Typography } from '@material-ui/core'

const AuthenticationForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    const formData = new FormData(e.target)
    console.log('Name:', formData.get('name'))
  }

  return <form onSubmit={handleSubmit}>
        <Typography variant="h3">
            Sign in
        </Typography>
        <FormGroup>
            <FormControl>
                <TextField id="username" label="username" />
            </FormControl>
            <FormControl>
                <TextField id="password" label="password" />
            </FormControl>
        </FormGroup>
        <Button type="submit">Sign in</Button>
    </form>
}

export default AuthenticationForm
