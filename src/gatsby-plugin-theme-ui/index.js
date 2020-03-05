import nightOwl from '@theme-ui/prism/presets/night-owl.json'
import Inter from './typography-theme-inter'
import merge from 'deepmerge'
import { toTheme } from '@theme-ui/typography'

export default merge(toTheme(Inter), {
  colors: {
    primary: '#326AFF',
    secondary: '#7790CC',
    text: 'hsl(0, 0%, 10%)',
    background: 'white',
  },

  breakpoints: ['40em', '56em', '64em'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    monospace: 'monospace',
  },

  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
  },

  buttons: {
    primary: {
      bg: 'text',
      color: 'background',
      cursor: 'pointer',
    },
    icon: {
      '&:hover': {
        opacity: 1,
      },
      cursor: 'pointer',
    },
  },

  links: {
    button: {
      p: 2,
      bg: 'primary',
      color: 'background',
      textDecoration: 'none',
      fontFamily: 'heading',
      fontWeight: 'normal',
    },
    navlink: {
      height: '100%',
      color: 'background',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      mr: 2,
    },
  },

  styles: {
    pre: {
      overflow: 'auto',
      mx: [-3, 0],
      borderRadius: [0, 3],
    },
    blockquote: {
      fontStyle: 'italic',
      fontSize: '110%',
      borderLeft: '2px solid',
      borderColor: 'black',
      ml: 0,
      pl: 3,
    },
    a: {
      color: 'primary',
    },

    root: {
      button: {
        cursor: 'pointer',
        color: 'primary',
      },
      '.markdown': {
        'p, ul': { py: 1 },
        li: { py: '0.25rem' },
      },
      code: {
        color: 'text',
        bg: '#f1f1f1',
        p: '3px 7px',
        fontFamily: 'monospace',
        fontSize: '90%',
      },
      'em, i': {
        fontStyle: 'italic',
      },
      color: 'text',
    },
    ul: {
      ml: 0,
    },
    code: {
      ...nightOwl,
      fontFamily: 'monospace',
    },
  },
})
