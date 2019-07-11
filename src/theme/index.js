import colors from './bits/colors'
import fonts from './bits/fonts'

export default {
  initialColorMode: 'default',
  useCustomProperties: true,
  breakpoints: ['540px', '768px', '992px', '1200px', '1920px'],
  fonts: { ...fonts },
  colors: {
    ...colors,
    text: colors.black,
    background: colors.white,
    primary: colors.blue,
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#E74C3C',
      },
    },
  },
}
