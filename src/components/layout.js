import React from 'react'
import { Layout, Header, Main, Footer, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Link from 'components/link'
import eggo from '../../assets/eggo.svg'

const pageLayout = ({ frontmatter = {}, children }) => (
  <Layout>
    <Header>
      <Container>
        <Link to="/">
          <img src={eggo} alt="" />
        </Link>
      </Container>
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