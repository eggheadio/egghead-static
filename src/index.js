import React from 'react'
import { ThemeProvider, Styled } from 'theme-ui'
import theme from './components/theme'
import './lib/reset.css'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <Styled.root>{element}</Styled.root>
  </ThemeProvider>
)
