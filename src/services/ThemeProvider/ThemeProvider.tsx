import React, { PropsWithChildren, FC } from 'react'
import { ThemeProvider as Provider } from 'styled-components'
import { useAppSelector } from 'store/store'

export interface ITheme {
  theme: {
    colors: {
      background: string
      secondary: string
      text: string
      primary: string
    }
  }
}

const lightTheme: ITheme['theme'] = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#ff0000',
    secondary: '#ffffff',
  },
}

const darkTheme: ITheme['theme'] = {
  colors: {
    background: '#1f1f1f',
    text: '#ffffff',
    primary: '#ff0000',
    secondary: '#0e0d0d',
  },
}

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const themeSelect = useAppSelector(state => state.ui.theme)
  const isDarkModeEnabled = themeSelect === 'dark'
  const theme = isDarkModeEnabled ? darkTheme : lightTheme

  return <Provider theme={theme}>{children}</Provider>
}
