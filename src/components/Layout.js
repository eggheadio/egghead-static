/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Global } from '@emotion/core'
import mdxComponents from './mdx'
import config from '../../config/website'
import resetStyles from '../lib/reset'

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
    <Fragment>
      <Global styles={resetStyles} />
      <div
        sx={{
          width: '100%',
          minHeight: '100vh',
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
          <noscript>This site runs best with JavaScript enabled.</noscript>
        </Helmet>
        <MDXProvider components={mdxComponents}>
          <Fragment>{children}</Fragment>
        </MDXProvider>
      </div>
    </Fragment>
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
