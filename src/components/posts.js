/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'
import { Link as StyledLink } from '@theme-ui/components'
import Layout from './layout'

export default function Posts({ posts, ...props }) {
  return (
    <Layout title="Posts" {...props}>
      <Styled.h2 sx={{ mt: '6px' }}>Archive</Styled.h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <StyledLink as={Link} to={post.slug}>
              (Week {post.date}) {post.title}
            </StyledLink>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
