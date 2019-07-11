import React from 'react'
import { ThemeProvider, Styled, ColorMode } from 'theme-ui'
import theme from './theme'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <Styled.root>{element}</Styled.root>
  </ThemeProvider>
)
