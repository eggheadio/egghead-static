import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'

import Container from './Container'
import Button from './Button'

const Header = ({ siteTitle }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header
      sx={{
        width: '100%',
      }}
    >
      <Button>primary</Button>
      <br />
      <br />
      <Button secondary>secondary</Button>
      <Container noVerticalPadding>
        <nav
          sx={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Link
            to="/"
            aria-label="go to homepage"
            sx={css`
              color: white;
              &:hover {
                color: white;
                text-decoration: none;
              }
            `}
          >
            {siteTitle}
          </Link>
          <div>
            <button
              onClick={e => {
                setColorMode(colorMode === 'default' ? 'dark' : 'default')
              }}
            >
              Toggle {colorMode === 'default' ? 'Dark' : 'default'}
            </button>
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
