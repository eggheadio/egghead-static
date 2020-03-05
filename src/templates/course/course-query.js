import { graphql } from "gatsby"
import CoursePage from "."

export default CoursePage

export const query = graphql`
  query CourseBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    course(slug: { eq: $slug }) {
      title
    }
  }
`
