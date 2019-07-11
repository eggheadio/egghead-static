import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Player from '../components/ReactPlayer'
import get from 'lodash/get'

const Lesson = ({ data: { lesson, site } }) => {
  return (
    <Layout site={site}>
      <div>
        <h1>{lesson.title}</h1>
        {lesson.media_urls && (
          <Player
            hls_url={get(lesson, 'media_urls.hls_url')}
            dash_url={get(lesson, 'media_urls.dash_url')}
          />
        )}
      </div>
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
        dash_url
      }
    }
  }
`
