/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { Flex } from "@theme-ui/components"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Link from "../components/link"
import formatDuration from "../utils/formatDuration"

const Courses = ({ data: { site, allCourse } }) => {
  const { totalCount } = allCourse

  const courses = allCourse.edges.filter(course => course !== undefined)

  return (
    <Layout title="Courses">
      <Container>
        <h1>{totalCount} Courses</h1>
        <ul sx={{ mt: 4, ml: 0 }}>
          {courses.map(({ node: course }) => (
            <li key={course.id} sx={{ mb: 4, listStyleType: "none" }}>
              <Flex sx={{ flexDirection: ["column", "row"] }}>
                <Link to={course.path} tabIndex="-1">
                  <img
                    src={course.square_cover_128_url}
                    alt={course.title}
                    sx={{
                      maxWidth: 80,
                      minWidth: 80,
                      height: 80,
                    }}
                  />
                </Link>

                <Flex
                  sx={{
                    flexDirection: "column",
                    justifyContent: "center",
                    ml: [0, 3],
                  }}
                >
                  <h3 sx={{ mb: 2 }}>
                    <Link to={course.path} sx={{ fontSize: 3 }}>
                      {course.title}
                    </Link>
                  </h3>
                  <Flex sx={{ div: { mr: 3 }, alignItems: "center" }}>
                    <Flex sx={{ alignItems: "center" }}>
                      <img
                        src={course.instructor.avatar_64_url}
                        alt={course.instructor.full_name}
                        sx={{
                          width: "32px",
                          height: "32px",
                          display: "block",
                          borderRadius: "50%",
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
      </Container>
    </Layout>
  )
}

export default Courses

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
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
          square_cover_128_url
          title
        }
      }
      totalCount
    }
  }
`
