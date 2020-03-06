/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

import ReactMarkdown from 'react-markdown'
import Illustration from '../components/e-commerce-jamstack-serverless/illustration'
import Collection from '../components/e-commerce-jamstack-serverless/collection'

const Summary = `
Quickly build low-maintenance products that scale with your userbase.
These collections cover everything you need to build a product from your first landing page to accepting payments to scaling your serverless backend. Getting started doesn't even require an AWS account.
`

const Feature = ({ image, children }) => (
  <div
    sx={{
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      borderRadius: 8,
      fontSize: ['100%', '85%'],
    }}
  >
    <img src={image} alt={children} sx={{ mb: 2 }} />
    <p sx={{ lineHeight: '1.4', marginBottom: 0 }}>{children}</p>
  </div>
)

const IndexPage = ({ data }) => {
  const collections = data.allCollection.nodes
  return (
    <>
      <Layout
        title="Building E-commerce Products with JAMStack and Serverless"
        description={Summary}
        card="https://res.cloudinary.com/dg3gyk0gu/image/upload/v1582127037/serverless-jamstack-e-commerce/og-image.png"
        bg="#fafafa"
      >
        <div
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: ['2rem 0.5rem', '3rem 2rem'],
            fontSize: [1, 2],
          }}
        >
          <Illustration />
          <Styled.h1
            sx={{
              fontSize: ['1.5rem', '2.5rem'],
              maxWidth: 700,
              textAlign: 'center',
              my: 3,
            }}
          >
            Building E-commerce Products with JAMStack and Serverless
          </Styled.h1>
          <p
            sx={{
              marginBottom: ['2rem', '3rem'],
              display: 'flex',
              alignItems: 'center',
              a: {
                color: 'inherit',
                textDecoration: 'none',
              },
            }}
          >
            Collections by{' '}
            <a
              href="https://egghead.io/instructors/chris-biscardi"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src="https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/275/medium/headshot_post_gym_dec_2018_500.png"
                alt="Chris Biscardi"
                width="32px"
                sx={{ borderRadius: '50%', margin: '0 0.5rem' }}
              />
              Christopher Biscardi
            </a>
          </p>
          <article sx={{ maxWidth: 780 }}>
            <ReactMarkdown
              className="markdown"
              source={Summary}
              sx={{
                ul: {
                  padding: 0,
                  listStylePosition: 'inside',
                  li: { listStyle: 'none' },
                  'li:before': {
                    content: "'✅'",
                    display: 'inline-block',
                    marginRight: '0.25rem',
                  },
                },
              }}
            />
            <Styled.h3 sx={{ marginTop: '2rem' }}>
              Learn how to build a product that lets your users:
            </Styled.h3>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: ['1fr', '1fr 1fr 1fr'],
                gridGap: '1rem',
                justifyContent: 'flex-start',
              }}
            >
              <Feature image="/learn/images/create-accounts.svg">
                Sign up using social or username/password combinations
              </Feature>
              <Feature image="/learn/images/subscription.svg">
                Pay monthly using Stripe
              </Feature>
              <Feature image="/learn/images/use-offline.svg">
                Use the site offline
              </Feature>
            </div>
            <Styled.h3 sx={{ marginTop: '2rem' }}>
              Using a JAMStack site that:
            </Styled.h3>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: ['1fr', '1fr 1fr 1fr'],
                gridGap: '1rem',
                justifyContent: 'flex-start',
              }}
            >
              <Feature image="/learn/images/deploy.svg">
                Deploys to a CDN, close to your users
              </Feature>
              <Feature image="/learn/images/static.svg">
                Pre-renders relevant pages as static html
              </Feature>
              <Feature image="/learn/images/authentication.svg">
                Authenticates users to access their data using dynamic,
                client-side apps
              </Feature>
            </div>
            <Styled.h3 sx={{ marginTop: '2rem' }}>
              And serverless functions that:
            </Styled.h3>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: ['1fr', '1fr 1fr 1fr'],
                gridGap: '1rem',
                justifyContent: 'flex-start',
              }}
            >
              <Feature image="/learn/images/graphql.svg">
                Provide GraphQL APIs
              </Feature>
              <Feature image="/learn/images/user-roles.svg">
                Implement Role Based Access Control
              </Feature>
              <Feature image="/learn/images/connect-database.svg">
                Interact with serverless databases like Fauna and DynamoDB
              </Feature>
            </div>
            <p>
              You will be introduced to real-world scenarios that put the pieces
              together. Along the way we'll cover topics such as: development
              and deployment best practices for JAMStack and serverless
              functions, dealing with canary deployments, CORS, implementing
              billing, site analytics, and observability. You'll also learn
              architectural patterns that enable patterns like webhooks, job
              queues, and how to use lambdas for dynamodb change data capture.
            </p>
          </article>
        </div>
        <article sx={{ padding: 0, fontSize: [1, 2] }}>
          {collections.map(collection => (
            <Collection data={collection} key={collection.id} />
          ))}
        </article>
      </Layout>
    </>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        description
      }
    }
    allCollection {
      totalCount
      nodes {
        id
        title
        duration
        description
        items {
          id
          title
          slug
          thumb_nail
          framework_list
          image_64_url
          summary
          transcript
          media_urls {
            dash_url
            hls_url
          }
        }
      }
    }
  }
`

export default IndexPage
