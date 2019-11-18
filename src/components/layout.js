import React from 'react'
import { Layout, Header, Main, Footer, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Navigation from 'components/navigation'
import Link from 'components/link'
import Logo from '../../assets/eggo.svg'

const pageLayout = ({ children }) => (
  <Layout>
    <Header>
      <Navigation>
        <Link to="/" sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="egghead.io" />
        </Link>
        <Link to="/courses">Courses</Link>
        <Link to="/podcasts">Podcasts</Link>
      </Navigation>
    </Header>
    <Main>{children}</Main>
    <Footer>
      <Container>@eggheadio</Container>
    </Footer>
  </Layout>
)

export default pageLayout

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
    }
  }
`
