/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import SEO from './seo'
import Header from './header'
import '../styles/reset.css'
import '../styles/fonts/inter.css'
import 'focus-visible'

export default function Layout({ bg, ...props }) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  return (
    <Styled.root>
      <SEO
        {...props}
        card={props.card}
        description={props.excerpt}
        title={props.title}
      />
      <Header title={data.site.siteMetadata.title} />
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100vh',
          background: bg ? bg : 'inherit',
        }}
      >
        <Container sx={{ maxWidth: '1380px', px: [2, 2, 4], pt: [2, 2, 3] }}>
          {props.children}
        </Container>

        {/* <Footer /> */}
      </div>
    </Styled.root>
  )
}
