import React from 'react'
import { Layout, Header, Main, Footer, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Navigation from 'components/navigation'

const pageLayout = ({ children }) => (
  <Layout>
    <Header>
      <Navigation />
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
