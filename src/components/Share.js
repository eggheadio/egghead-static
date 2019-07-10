/** @jsx jsx */
import { jsx } from 'theme-ui'

import { TwitterShareButton, FacebookShareButton } from 'react-share'

const Share = ({ url, title, twitterHandle }) => {
  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div
        sx={{
          height: '1px',
          flexGrow: 1,
          background: theme => theme.colors.black,
          opacity: 0.2,
          mr: '20px',
        }}
      />
      <div
        sx={{
          mr: '20px',
          fontSize: '70%',
          textTransform: 'uppercase',
          lineHeight: 2.5,
          opacity: 0.7,
        }}
      >
        Share article
      </div>
      <TwitterShareButton
        url={url}
        quote={title}
        via={twitterHandle.split('@').join('')}
      >
        Twitter
      </TwitterShareButton>
      <div
        sx={{
          ml: '20px',
        }}
      >
        <FacebookShareButton
          url={url}
          quote={title}
          via={twitterHandle.split('@').join('')}
          sx={{ cursor: 'pointer' }}
        >
          Facebook
        </FacebookShareButton>
      </div>
    </div>
  )
}

export default Share
