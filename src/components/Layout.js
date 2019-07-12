/** @jsx jsx */
import { jsx, Layout, Header, Main, Footer, Container } from 'theme-ui'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import config from '../../config/website'
import Link from 'components/Link'
import eggo from '../../assets/eggo.svg'

function pageLayout({ site, frontmatter = {}, children }) {
  const {
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter

  const keywords = (frontmatterKeywords || siteKeywords).join(', ')
  const description = frontmatterDescription || siteDescription

  return (
    <Layout>
      <Helmet
        title={config.siteTitle}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Header>
        <Container>
          <Link to="/">
            <img src={eggo} alt="" />
          </Link>
        </Container>
      </Header>
      <Main>
        <Container>{children}</Container>
      </Main>
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
