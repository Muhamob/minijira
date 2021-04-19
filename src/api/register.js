import axios from 'axios'
import { defaultConfig } from './config'

const client = axios.create(defaultConfig)

export const registerUserRequest = (user, config) => {
  return client.post('/auth/register', user, config)
}

export const loginUserRequest = (user, config) => {
  return client.post('/auth/login', user, config)
}
