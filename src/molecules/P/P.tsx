import styled from 'styled-components'
import { ITheme } from 'services/ThemeProvider/ThemeProvider'

export const P = styled.span<ITheme>`
  color: ${({ theme }) => theme.colors.text};
`
