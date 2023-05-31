export const getTokenFromLS = (): string | null => {
  const isAuth: string | null = JSON.parse(localStorage.getItem('auth'))?.token
  return isAuth
}
