import React from 'react'
import { ColorModeProvider, ThemeProvider, Styled, ColorMode } from 'theme-ui'
import theme from './lib/theme'

export const wrapRootElement = ({ element }) => (
  <ColorModeProvider initialColorMode="default">
    <ThemeProvider theme={theme}>
      <ColorMode />
      <Styled.root>{element}</Styled.root>
    </ThemeProvider>
  </ColorModeProvider>
)
