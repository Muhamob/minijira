import { useState } from 'react'

export const useFormData = () => {
  const [state, setState] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  return [state, handleChange]
}
