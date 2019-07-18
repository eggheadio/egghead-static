/** @jsx jsx */
import React from 'react'
import { graphql } from 'gatsby'
import { jsx, Container } from 'theme-ui'
import Layout from 'components/layout'

const Course = ({ data: { course, site } }) => {
  return (
    <Layout site={site}>
      <Container>
        <h1>{course.title}</h1>
        <img
          sx={{ maxWidth: 200 }}
          src={course.square_cover_url}
          alt={course.title}
        />
      </Container>
    </Layout>
  )
}

export default Course
export const query = graphql`
  query CourseBySlug($slug: String!) {
    site {
      ...site
    }
    course(slug: { eq: $slug }) {
      title
      square_cover_url
    }
  }
`
