import React, { PropsWithChildren, FC } from 'react'
import { ThemeProvider as Provider } from 'styled-components'

const theme = {
  colors: {
    primary: '#ff0000',
    secondary: '#00ff00',
  },
}

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider theme={theme}>{children}</Provider>
}
