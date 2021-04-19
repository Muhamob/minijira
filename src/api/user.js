import axios from 'axios'
import { getAccessToken } from '../utils/auth'
import { defaultConfig } from './config'

const client = axios.create(defaultConfig)

export const getUserProfile = () => {
  client.config.headers.Authorization = getAccessToken()
  return client.get('/auth/profile')
}
