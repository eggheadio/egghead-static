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
          flexGrow: 1,
          borderTop: theme => `1px solid ${theme.colors.gray}`,
          mr: '20px',
          cursor: 'pointer',
          ':hover': {
            color: theme => theme.colors.primary,
          },
        }}
      />
      <span
        sx={{
          mr: '20px',
          fontSize: '70%',
          textTransform: 'uppercase',
          lineHeight: 2.5,
          opacity: 0.7,
        }}
      >
        Share article
      </span>
      <TwitterShareButton
        url={url}
        quote={title}
        via={twitterHandle.split('@').join('')}
      >
        Twitter
      </TwitterShareButton>
      <FacebookShareButton
        url={url}
        quote={title}
        via={twitterHandle.split('@').join('')}
        sx={{ cursor: 'pointer' }}
      >
        Facebook
      </FacebookShareButton>
    </div>
  )
}

export default Share
