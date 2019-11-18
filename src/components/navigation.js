/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import Link from 'components/link'

function Navigation({ children }) {
  return (
    <Container
      sx={{
        py: 0,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <nav
        role="navigation"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexGrow: '1',
          fontSize: 1,
          ' ul, li, a': {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          },
          li: { ml: 4 },
        }}
      >
        <ul>
          {children.map(menuItem => {
            return <li>{menuItem}</li>
          })}
        </ul>
      </nav>
    </Container>
  )
}

export default Navigation
