export const setTokenToLS = token => {
  localStorage.setItem('auth', JSON.stringify({ token }))
}
