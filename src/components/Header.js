import { Link, StaticQuery, graphql } from 'gatsby'
/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'

import Container from './Container'
import Button from './Button'

const Header = ({ siteTitle }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header>
      <Container noVerticalPadding>
        <nav
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            to="/"
            aria-label="go to homepage"
            sx={{
              color: theme => theme.colors.text,
              '&:hover': {
                color: theme => theme.colors.primary,
                textDecoration: 'none',
              },
            }}
          >
            {siteTitle}
          </Link>
          <div>
            <Button
              onClick={e => {
                setColorMode(colorMode === 'default' ? 'dark' : 'default')
              }}
            >
              {colorMode === 'default' ? 'Dark' : 'Light'}
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

const ConnectedHeader = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Header siteTitle={data.site.siteMetadata.title} {...props} />
    )}
  />
)

export default ConnectedHeader
