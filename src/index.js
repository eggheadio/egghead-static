import React from 'react'
import { ThemeProvider, Styled } from 'theme-ui'
import './lib/reset.css'
import theme from './lib/theme'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <Styled.root>{element}</Styled.root>
  </ThemeProvider>
)
