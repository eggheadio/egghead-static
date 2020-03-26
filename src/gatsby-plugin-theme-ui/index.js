import nightOwl from '@theme-ui/prism/presets/night-owl.json'
import interTheme from './typography-theme-inter'
import merge from 'deepmerge'
import { toTheme } from '@theme-ui/typography'

export default merge(toTheme(interTheme), {
  colors: {
    primary: '#1e63ff',
    secondary: '#7790CC',
    text: '#10182D',
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

  cards: {
    resource: {
      display: 'grid',
      gridGap: 3,
      gridTemplateColumns: ['100%', '2fr 8fr'],
      h3: {
        fontSize: 24,
        mt: 0,
        mb: 2,
      },
    },
  },

  sidebar: {
    pt: '4.85rem',
    'h1,h2,h3,h4': { mb: 1 },
    'p, ul': { fontSize: 1 },
    li: {
      my: 0,
      py: 1,
      borderBottom: '1px solid',
      borderColor: '#f1f1f1',
    },
    ul: { listStyle: 'none', ml: 0 },
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
      '&:hover': {
        textDecoration: 'underline',
      },
    },

    root: {
      'h2, h3': { mt: [3, 4] },
      '.tippy-content': {
        p: 0,
      },
      fontSize: [1, 2],
      button: {
        cursor: 'pointer',
        color: 'primary',
      },
      '.markdown': {
        'p, ul': { py: 1 },
        li: { py: '0.25rem' },
      },
      ul: {
        ml: '1.25rem',
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
    hr: {
      opacity: 0.1,
    },
    code: {
      ...nightOwl,
      fontFamily: 'monospace',
    },
  },
})
