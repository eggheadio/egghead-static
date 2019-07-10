// import colors from './colors'

export default {
  initialColorMode: 'default',
  useCustomProperties: true,
  breakpoints: ['540px', '768px', '992px', '1200px', '1920px'],
  colors: {
    black: '#131415',
    white: '#fff',
    gray: '#fafafa',
    red: '#E74C3C',
    blue: '#5348ff',
    green: '#29B573',
    text: '#000',
    background: '#fff',
    primary: '#5348ff',
    secondary: '#29B573',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#E74C3C',
        secondary: '#fafafa',
      },
    },
  },
  shadows: {
    light: {
      boxShadow: '1px 1px 5px #000',
    },
  },
  buttons: {
    pill: {
      display: 'flex',
      alignItems: 'center',
      padding: ['10px 15px', '15px 20px'],
      borderRadius: '9999px',
      fontSize: 2,
      fontWeight: 500,
      textDecoration: 'none',
      lineHeight: '1',
      border: 'none',
      ':hover': { variant: 'shadows.light' },
    },
    primary: {
      variant: 'buttons.pill',
      backgroundColor: 'primary',
      color: 'background',
    },
    secondary: {
      variant: 'buttons.pill',
      backgroundColor: 'secondary',
      border: '1px solid',
      borderColor: 'gray',
      color: 'text',
    },
  },
}
