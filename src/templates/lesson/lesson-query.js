import { graphql } from "gatsby"
import LessonPage from "."

export default LessonPage

export const query = graphql`
  query LessonBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    lesson(slug: { eq: $slug }) {
      title
      slug
      thumb_nail
      media_urls {
        hls_url
        dash_url
      }
    }
  }
`
