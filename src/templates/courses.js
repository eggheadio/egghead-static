/** @jsx jsx */
import { jsx, Flex, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Link from 'components/link'
import formatDuration from 'lib/formatDuration'

const Courses = ({
  data: { site, allCourse },
  pageContext: { pagination },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination
  const { totalCount } = allCourse

  const courses = page
    .map(id => allCourse.edges.find(edge => edge.node.id === id))
    .filter(course => course !== undefined)

  return (
    <Layout site={site}>
      <Container>
        <h1>{totalCount} Courses</h1>
        <ul sx={{ variant: 'lists.reset', mt: 4 }}>
          {courses.map(({ node: course }) => (
            <li key={course.id} sx={{ mb: 4 }}>
              <Flex sx={{ flexDirection: ['column', 'row'] }}>
                <Link to={course.path} tabindex="-1">
                  <img
                    src={course.square_cover_256_url}
                    alt={course.title}
                    sx={{
                      maxWidth: '80px',
                    }}
                  />
                </Link>

                <Flex
                  sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    ml: [0, 3],
                  }}
                >
                  <h3 sx={{ mb: 2 }}>
                    <Link to={course.path} sx={{ fontSize: 3 }}>
                      {course.title}
                    </Link>
                  </h3>
                  <Flex sx={{ div: { mr: 3 }, alignItems: 'center' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                      <img
                        src={course.instructor.avatar_64_url}
                        alt={course.instructor.full_name}
                        sx={{
                          width: '32px',
                          height: '32px',
                          display: 'block',
                          borderRadius: '50%',
                          m: 0,
                          mr: 2,
                        }}
                      />
                      {course.instructor.full_name}
                    </Flex>
                    <div>{formatDuration(course.duration)}</div>
                    <div>{course.is_pro_content && <b>PRO</b>}</div>
                  </Flex>
                </Flex>
              </Flex>
            </li>
          ))}
        </ul>
        <div
          sx={{
            mt: 50,
          }}
        >
          {nextPagePath && (
            <Link to={nextPagePath} aria-label="View next page">
              Next Page →
            </Link>
          )}
          <br />
          {previousPagePath && (
            <Link to={previousPagePath} aria-label="View previous page">
              ← Previous Page
            </Link>
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default Courses

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allCourse {
      edges {
        node {
          duration
          path
          id
          instructor {
            avatar_64_url
            full_name
          }
          is_pro_content
          slug
          square_cover_256_url
          title
        }
      }
      totalCount
    }
  }
`
