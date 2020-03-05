import { graphql } from "gatsby"
import LessonPage from "."

export default LessonPage

export const query = graphql`
  query PodcastBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    podcast(slug: { eq: $slug }) {
      title
    }
  }
`
