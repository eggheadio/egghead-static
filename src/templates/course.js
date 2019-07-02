import React from 'react'
import { graphql } from 'gatsby'
import Container from 'components/Container'
import Layout from '../components/Layout'

const Course = ({ data: { course, site } }) => {
  return (
    <Layout site={site} noFooter>
      <Container noVerticalPadding>
        <h1>{course.title}</h1>
        <img src={course.square_cover_url} alt={course.title} />
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
