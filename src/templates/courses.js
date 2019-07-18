/** @jsx jsx */
import { jsx, Flex, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Link from 'components/link'

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
        <h4 sx={{ margin: '0 0 30px 0' }}>there are {totalCount} courses:</h4>
        {courses.map(({ node: course }) => (
          <div
            key={course.id}
            sx={{
              padding: '20px',
              border: '1px solid gray',
              margin: 0,
              ':not(:first-of-type)': {
                marginTop: '30px',
              },
            }}
          >
            <Flex>
              <div sx={{ flexShrink: 0 }}>
                <a href={course.path}>
                  <img
                    src={course.square_cover_256_url}
                    alt=""
                    sx={{
                      width: '100px',
                      height: '100px',
                      display: 'block',
                      margin: 0,
                    }}
                  />
                </a>
              </div>
              <div sx={{ marginLeft: '30px' }}>
                <h4 sx={{ margin: 0 }}>
                  <a href={course.path}>{course.slug}</a>
                </h4>
                <div sx={{ display: 'flex', marginTop: '20px' }}>
                  <div>{course.duration}</div>
                  <div>
                    <img
                      src={course.instructor.avatar_64_url}
                      alt=""
                      sx={{
                        width: '32px',
                        height: '32px',
                        display: 'block',
                        borderRadius: '50%',
                        margin: 0,
                      }}
                    />
                  </div>
                  <div>{course.instructor.full_name}</div>
                  <div>{course.is_pro_content && <b>PRO</b>}</div>
                </div>
              </div>
            </Flex>
          </div>
        ))}
        <div
          sx={{
            marginTop: '50px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {previousPagePath ? (
            <Link to={previousPagePath} aria-label="View previous page">
              ← Previous Page
            </Link>
          ) : (
            <div />
          )}
          {nextPagePath && (
            <Link to={nextPagePath} aria-label="View next page">
              Next Page →
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
        }
      }
      totalCount
    }
  }
`
