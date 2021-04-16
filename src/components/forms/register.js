import { Button, FormControl, FormGroup, Input, TextField } from '@material-ui/core'

const RegisterForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    const formData = new FormData(e.target)
    console.log('Name:', formData.get('name'))
  }

  return <form onSubmit={handleSubmit}>
        <FormGroup>
            <FormControl>
                <TextField id="username" label="username" />
            </FormControl>
            <FormControl>
                <TextField id="email" label="email" />
            </FormControl>
            <FormControl>
                <TextField id="password" label="password" />
            </FormControl>
        </FormGroup>
        <Button type="submit">Sign up</Button>
    </form>
}

export default RegisterForm
