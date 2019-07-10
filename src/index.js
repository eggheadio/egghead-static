import React from 'react'
import { ThemeProvider, Styled, ColorMode } from 'theme-ui'
import Footer from './components/Footer'
import theme from './lib/theme'

const GlobalScopeComponents = {
  Footer,
}

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme} components={{ ...GlobalScopeComponents }}>
    <ColorMode />
    <Styled.root>{element}</Styled.root>
  </ThemeProvider>
)
