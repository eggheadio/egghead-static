/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'

export default function Index({ data: { site, allMdx } }) {
  return (
    <Layout site={site}>
      <Container>
        <h1>
          Welcome to egghead-static development{' '}
          <span role="img" aria-label="robot">
            🤖
          </span>
        </h1>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
