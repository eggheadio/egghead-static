/** @jsx jsx */
import React from 'react'
import { graphql } from 'gatsby'
import { jsx, Container, Flex } from 'theme-ui'
import Layout from 'components/layout'
import Markdown from 'react-markdown'
import Link from 'components/link'

const Course = ({ data: { course, site } }) => {
  return (
    <Layout site={site}>
      <Container>
        <img
          sx={{ maxWidth: 200, height: 200, mb: 5 }}
          src={course.square_cover_480_url}
          alt={course.title}
        />
        <h1>{course.title}</h1>
        <Flex
          sx={{
            mt: 2,
            alignItems: 'center',
            img: { mr: 2, width: 28, height: 28, borderRadius: '50%' },
          }}
        >
          <img
            src={course.instructor.avatar_32_url}
            alt={course.instructor.full_name}
          />
          <h4>{course.instructor.full_name}</h4>
        </Flex>
        <div sx={{ my: 2 }}>
          <b>{Math.ceil(course.rating_out_of_5)} / 5</b>,{' '}
          <b>{course.rating_count}</b> people rated, published{' '}
          <div>
            <b>{course.published_at}</b>
          </div>
        </div>
        <article>
          <Markdown sx={{ mt: 7, variant: 'text.reset' }}>
            {course.description}
          </Markdown>
        </article>
        <br />
        <h3>Lessons</h3>
        <ol sx={{ ml: 4 }}>
          {course.lessons &&
            course.lessons.map(lesson => (
              <li key={lesson.id} sx={{ mt: 2, h4: { fontSize: 2 } }}>
                <Link to={`/lessons/${lesson.slug}`}>
                  <h4>{lesson.title}</h4>
                </Link>
              </li>
            ))}
        </ol>
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
      summary
      description
      square_cover_480_url
      rating_out_of_5
      published_at(fromNow: true)
      rating_count
      instructor {
        full_name
        avatar_32_url
      }
      lessons {
        id
        slug
        title
      }
    }
  }
`
