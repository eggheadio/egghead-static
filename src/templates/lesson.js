import React from 'react'
import { graphql } from 'gatsby'
import Container from 'components/Container'
import Layout from '../components/Layout'
import Player from '../components/Player'

const Lesson = ({ data: { lesson, site } }) => {
  return (
    <Layout site={site} noFooter>
      <Container noVerticalPadding>
        <h1>{lesson.title}</h1>
        <Player source={lesson.media_urls.hls_url} poster={lesson.thumb_nail} />
      </Container>
    </Layout>
  )
}

export default Lesson
export const query = graphql`
  query LessonBySlug($slug: String!) {
    site {
      ...site
    }
    lesson(slug: { eq: $slug }) {
      title
      thumb_nail
      media_urls {
        hls_url
      }
    }
  }
`
