import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Course = ({ data: { course, site } }) => {
  return (
    <Layout site={site}>
      <div>
        <h1>{course.title}</h1>
        <img src={course.square_cover_url} alt={course.title} />
      </div>
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
