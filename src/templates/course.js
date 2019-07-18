/** @jsx jsx */
import React from 'react'
import { graphql } from 'gatsby'
import { jsx, Container, Flex } from 'theme-ui'
import Layout from 'components/layout'

const Course = ({ data: { course, site } }) => {
  return (
    <Layout site={site}>
      <Container>
        <img
          sx={{ maxWidth: 200, height: 200 }}
          src={course.square_cover_480_url}
          alt={course.title}
        />
        <br />
        <h1>{course.title}</h1>
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
      square_cover_480_url
    }
  }
`
