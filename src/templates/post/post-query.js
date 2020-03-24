import { graphql } from 'gatsby'
import PostPage from '.'

export default PostPage

export const query = graphql`
  query PostPageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
      }
    }
    blogPost(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      tags
      keywords
      published
      date(formatString: "W")
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
