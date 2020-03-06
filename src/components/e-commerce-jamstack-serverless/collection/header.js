/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import convertTimeTo from '../../../utils/convertTimeTo'
import Image from './image'
import ReactMarkdown from 'react-markdown'

export default function Header({ data }) {
  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: ['auto', '220px auto', '320px auto'],
        gridGap: '2rem',
        position: 'relative',
        padding: ['2rem 0.5rem', '4rem 2rem'],
        boxShadow: ['none', '0 -50px 50px -10px rgba(0,0,0,0.05)'],
        background: ['none', 'linear-gradient(0deg, #fafafa 0%, #fff 100%)'],
        borderRadius: ['none', '8px 8px 0 0'],
        '::after': {
          marginTop: 80,
          content: "''",
          width: [0, 2],
          height: '100%',
          marginLeft: 193,
          background: 'rgba(0,0,0,0.05)',
          position: 'absolute',
        },
      }}
    >
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image items={data.items} />

        <a
          href={`/lessons/${data.items[0].slug}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.7rem 1rem',
            background: '#4D71F3',
            borderRadius: 3,
            color: '#fff',
            textDecoration: 'none',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Start Watching
        </a>
      </div>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
        }}
      >
        <Styled.h2 sx={{ fontSize: [3, 4] }}>{data.title}</Styled.h2>

        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            span: {
              marginRight: '1.5rem',
            },
          }}
        >
          <span>{data.items.length} video lessons</span>
          <span>{convertTimeTo(data.duration)}</span>
          <span>{'Community Resource'}</span>
        </div>

        <div sx={{ textAlign: 'left', maxWidth: 720 }}>
          <ReactMarkdown
            className="markdown"
            source={data.description}
            sx={{
              a: { color: 'primary' },
            }}
          />
        </div>
      </div>
    </div>
  )
}
