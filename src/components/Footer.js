/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import SubscribeForm from './Forms/Subscribe'
import { Twitter, GitHub } from './Social'
import Container from './Container'

const Footer = ({ author, noSubscribeForm }) => (
  <footer>
    <Container sx={{ pt: 0 }}>
      {!noSubscribeForm && (
        <div>
          <SubscribeForm />
          <br />
          <br />
        </div>
      )}
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          sx={{
            fontSize: '90%',
            opacity: 0.7,
          }}
        >
          {author && `${author} \u00A9 ${new Date().getFullYear()}`}
        </div>
        <Flex>
          <Twitter />
          <GitHub />
        </Flex>
      </div>
    </Container>
  </footer>
)

export default Footer
