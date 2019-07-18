/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import Logo from '../../assets/eggo.svg'
import Link from 'components/link'

function Navigation() {
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
            variant: 'lists.reset',
          },
          li: { ml: 4 },
        }}
      >
        <h1>
          <Link to="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="egghead.io" />
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
      </nav>
    </Container>
  )
}

export default Navigation
