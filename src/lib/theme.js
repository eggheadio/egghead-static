export default {
  useCustomProperties: true,
  breakpoints: ['540px', '768px', '992px', '1200px', '1920px'],
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128, 256, 512],
  fontSizes: [12, 14, 16, 18, 20, 22, 24, 32, 40, 48, 64],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 500,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#131415',
    background: '#fff',
    primary: '#5348ff',
  },
  headings: {
    reset: {
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
  },
  buttons: {
    base: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'primary',
      transition: '150ms',
      fontSize: 1,
      fontWeight: 'heading',
      textDecoration: 'none',
      lineHeight: '1',
      p: 3,
      cursor: 'pointer',
    },
    default: {
      variant: 'buttons.base',
      color: 'primary',
      bg: 'white',
      '@media (hover: hover)': {
        ':hover': {},
      },
    },
    primary: {
      variant: 'buttons.base',
      color: 'white',
      bg: 'primary',
      '@media (hover: hover)': {
        ':hover': {},
      },
    },
  },
  lists: {
    reset: {
      listStyle: 'none',
    },
  },
  styles: {
    root: {
      fontSize: 2,
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      ul: {
        variant: 'lists.reset',
      },
      a: {
        color: 'primary',
      },
      'h1, h2, h3, h4, h5': {
        variant: 'headings.reset',
      },
      h1: {
        fontSize: 7,
      },
      h2: {
        fontSize: 6,
      },
      h3: {
        fontSize: 5,
      },
      h4: {
        fontSize: 4,
      },
      h5: {
        fontSize: 3,
      },
    },
  },
}
