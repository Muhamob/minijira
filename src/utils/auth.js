export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', `Bearer ${token}`)
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}
