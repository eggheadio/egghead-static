import React from 'react'
import { ThemeProvider, Styled, ColorMode } from 'theme-ui'
import theme from './lib/theme'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <Styled.root>{element}</Styled.root>
  </ThemeProvider>
)
