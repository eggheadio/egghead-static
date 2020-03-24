import { graphql } from 'gatsby'
import PostsPage from '.'

export default PostsPage

export const query = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allBlogPost(
      sort: { fields: [date, title], order: DESC }
      filter: { published: { eq: true } }
      limit: 1000
    ) {
      edges {
        node {
          id
          excerpt
          slug
          title
          date(formatString: "W")
          tags
        }
      }
    }
  }
`
