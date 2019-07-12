import React from 'react'
import { Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'

export default function Index({ data: { site } }) {
  return (
    <Layout site={site}>
      <Container>
        <h1>
          Welcome to egghead-static development{' '}
          <span role="img" aria-label="robot">
            🤖
          </span>
        </h1>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
  }
`
