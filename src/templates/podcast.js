/** @jsx jsx */
import { graphql } from 'gatsby'
import { jsx, Container, Flex } from 'theme-ui'
import Layout from 'components/layout'
import ReactMarkdown from 'react-markdown/with-html'

const Podcast = ({ data: { podcast, site } }) => {
  return (
    <Layout site={site}>
      <Container>
        <img
          sx={{ maxWidth: 200, height: 200, mb: 5 }}
          src={podcast.image_url}
          alt={podcast.title}
        />
        <h1>{podcast.title}</h1>
        <Flex
          sx={{
            mt: 2,
            alignItems: 'center',
            img: { mr: 2, width: 28, height: 28, borderRadius: '50%' },
          }}
        >
          <h4>{podcast.contributors}</h4>
        </Flex>
        <div sx={{ my: 2 }}>
          <div>
            <b>{podcast.published_at}</b>
          </div>
        </div>
        <ReactMarkdown source={podcast.description} escapeHtml={false} />
        <br />
        <h2>Transcript</h2>
        <ReactMarkdown source={podcast.transcript} escapeHtml={false} />
      </Container>
    </Layout>
  )
}

export default Podcast

export const query = graphql`
  query Podcast($slug: String!) {
    site {
      ...site
    }
    podcast(slug: { eq: $slug }) {
      title
      summary
      description
      transcript
      id
      episode_number
      image_url
      published_at
      contributors
    }
  }
`
