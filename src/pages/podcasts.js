/** @jsx jsx */
import { jsx, Flex, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Link from 'components/link'
import formatDuration from 'lib/formatDuration'

const Podcasts = ({ data: { site, allPodcast } }) => {
  return (
    <Layout site={site}>
      <Container>
        <h1>Podcasts</h1>
        <ul sx={{ mt: 4 }}>
          {allPodcast.edges.map(({ node: podcast }) => (
            <li key={podcast.id} sx={{ mb: 4 }}>
              <Flex sx={{ flexDirection: ['column', 'row'] }}>
                <img
                  src={podcast.image_url}
                  alt={podcast.title}
                  sx={{
                    maxWidth: 120,
                    minWidth: 120,
                    height: 120,
                  }}
                />

                <Flex
                  sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    ml: [0, 3],
                  }}
                >
                  <Link to={podcast.path}>
                    <h3 sx={{ mb: 2, fontSize: 3 }}>{podcast.title}</h3>
                  </Link>
                  <p sx={{ marginBottom: '10px' }}>{podcast.summary}</p>
                  <Flex sx={{ div: { mr: 3 }, alignItems: 'center' }}>
                    <span sx={{ paddingRight: '10px', fontWeight: 'bold' }}>
                      {podcast.contributors}
                    </span>
                    <div>{podcast.published_at}</div>
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

export default Podcasts

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allPodcast {
      edges {
        node {
          contributors
          episode_number
          image_url
          title
          published_at
          summary
          id
          path
        }
      }
    }
  }
`
