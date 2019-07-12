/** @jsx jsx */
import { jsx, Layout, Header, Main, Footer, Container } from 'theme-ui'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Link from 'components/Link'
import eggo from '../../assets/eggo.svg'

function pageLayout({ frontmatter = {}, children }) {
  return (
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
}

export default pageLayout

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author {
        name
      }
      keywords
    }
  }
`
