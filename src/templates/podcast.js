import React from 'react'
import { graphql } from 'gatsby'
import Container from 'components/Container'
import Layout from '../components/Layout'

const Podcast = ({ data: { podcast, site } }) => {
  return (
    <Layout site={site} noFooter>
      <Container noVerticalPadding>
        <h1>{podcast.title}</h1>
        <img src={podcast.image_url} alt={podcast.title} />
      </Container>
    </Layout>
  )
}

export default Podcast
export const query = graphql`
  query PodcastBySlug($slug: String!) {
    site {
      ...site
    }
    podcast(slug: { eq: $slug }) {
      title
      image_url
    }
  }
`
