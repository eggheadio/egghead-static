import React from 'react'
import { ThemeProvider, Styled, ColorMode } from 'theme-ui'
import theme from './components/theme'
import './lib/reset.css'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <Styled.root>{element}</Styled.root>
  </ThemeProvider>
)
