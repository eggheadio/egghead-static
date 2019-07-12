/** @jsx jsx */
import { jsx, Header, Main, Footer, Container } from 'theme-ui'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import mdxComponents from './mdx'
import config from '../../config/website'
import Link from 'components/Link'
import eggo from '../../assets/eggo.svg'

export default ({ site, frontmatter = {}, children }) => {
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
    <div
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </Main>
      <Footer>
        <Container>@eggheadio</Container>
      </Footer>
    </div>
  )
}

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
