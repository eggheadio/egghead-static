/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { transparentize } from '@theme-ui/color'
import React from 'react'
import Header from './header'
import ReactMarkdown from 'react-markdown'
import ReactPlayer from 'react-player'
import shortcodes from 'remark-shortcodes'
import get from 'lodash/get'

function hmsToSeconds(str) {
  var p = str.split(':'),
    s = 0,
    m = 1

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10)
    m *= 60
  }
  return s
}

const Item = ({ lesson, i }) => {
  const player = React.useRef(null)
  const [finished, setFinished] = React.useState(false)
  const [showTranscript, setShowTranscript] = React.useState(false)

  const handleOnEnded = () => {
    setFinished(true)
  }

  const LinkReference = props => {
    const children = get(props, 'children', [''])
    const linkText = children[0]
    const secondsToSeek = hmsToSeconds(linkText.props.children)

    return (
      <button
        sx={{
          border: 'none',
          padding: 0,
          color: 'blue',
          fontSize: '1rem',
        }}
        onClick={() => player.current.seekTo(secondsToSeek)}
      >
        {children}
      </button>
    )
  }

  return (
    <li
      key={lesson.id}
      sx={{
        display: 'grid',
        gridTemplateColumns: ['auto', '220px auto', '320px auto'],
        gridGap: ['1rem', '2rem'],
        position: 'relative',
        marginBottom: '3rem',
      }}
    >
      <div
        sx={{
          '::after': {
            content: "''",
            width: [0, 2],
            height: '100%',
            marginLeft: 158,
            background: 'rgba(0,0,0,0.05)',
            position: 'absolute',
          },
        }}
      >
        <div
          sx={{
            display: 'flex',
            flexDirection: ['column', 'row'],
          }}
        >
          {finished ? (
            '✅'
          ) : (
            <small
              sx={{
                marginLeft: [0, '-1.5rem'],
                marginTop: '1rem',
                position: ['static', 'absolute'],
                color: 'rgba(0,0,0,0.6)',
                fontSize: '0.7rem',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '3px 0 0 3px',
                boxShadow: '0 8px 25px -2px #E5E4E4',
                // marginBottom: '1rem',
              }}
            >
              {i + 1}
            </small>
          )}
          <div
            sx={{
              padding: 1,
              background: 'white',
              boxShadow: '0 8px 25px -2px #E5E4E4',
              borderRadius: 5,
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <div
              sx={{
                paddingTop: '56.25%',
                width: '100%',
                height: 0,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <ReactPlayer
                ref={player}
                light={get(lesson, 'thumb_nail')}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                }}
                width="100%"
                height="100%"
                url={
                  get(lesson, 'media_urls.dash_url') ||
                  get(lesson, 'media_urls.hls_url')
                }
                onEnded={handleOnEnded}
                controls
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: [0, '1.5rem'],
          }}
        >
          <img
            src={lesson.image_64_url}
            alt={lesson.framework_list[0]}
            width="26"
            sx={{ mr: 1, mt: '4px' }}
          />
          <a
            href={`https://egghead.io/lessons/${lesson.slug}`}
            sx={{
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline',
                textDecorationColor: transparentize('text', 0.65),
              },
            }}
          >
            <Styled.h3
              sx={{
                fontSize: [2, 3],
                lineHeight: 1.2,
                color: 'text',
                mb: 2,
              }}
            >
              {lesson.title}
            </Styled.h3>
          </a>
        </div>

        {lesson.summary && (
          <ReactMarkdown
            source={lesson.summary}
            className="markdown"
            sx={{ ml: [0, 3], a: { color: 'primary' } }}
          />
        )}
        {lesson.transcript && (
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            sx={{
              fontSize: [1, 2],
              border: 'none',
              background: 'none',
              padding: 0,
              color: 'primary',
              ml: [0, 3],
              cursor: 'pointer',
            }}
          >
            {showTranscript ? 'Collapse' : 'Read'} Transcript
          </button>
        )}
        {lesson.transcript && showTranscript && (
          <>
            <ReactMarkdown
              className="markdown"
              sx={{ fontSize: '87%', ml: [0, 3] }}
              source={lesson.transcript}
              plugins={[shortcodes]}
              renderers={{ linkReference: LinkReference }}
              skipHtml={false}
              escapeHtml={false}
            />
          </>
        )}
      </div>
    </li>
  )
}

export default function Collection({ data, error }) {
  return (
    <>
      <div
        sx={{
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header data={data} />
        <ul
          sx={{
            textAlign: 'left',
            padding: ['0 0.5rem', '0 2rem'],
            listStyle: 'none',
            overflow: 'hidden',
            position: 'relative',
            margin: 0,
          }}
        >
          {data.items.map((lesson, i) => (
            <Item lesson={lesson} i={i} key={lesson.id} />
          ))}
        </ul>
      </div>
    </>
  )
}
