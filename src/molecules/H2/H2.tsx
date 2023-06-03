import styled from 'styled-components'
import { ITheme } from 'services/ThemeProvider/ThemeProvider'

export const H2 = styled.h2<ITheme>`
  color: ${({ theme }) => theme.colors.text};
`
