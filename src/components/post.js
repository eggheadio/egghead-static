/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Layout from './layout'
import { isEmpty } from 'lodash'

export default function Post({
  children,
  data: {
    blogPost: { title, date, excerpt, keywords, tags, published },
  },
  ...props
}) {
  return (
    <Layout title={title} description={excerpt} {...props}>
      <div sx={{ a: { textDecoration: 'none' } }}>{children}</div>
      {!isEmpty(tags) && !isEmpty(keywords) && (
        <ul
          sx={{
            borderTop: '1px solid #f1f1f1',
            py: 3,
            mt: 4,
            fontSize: 1,
            textTransform: 'capitalize',
            display: 'flex',
            flexWrap: 'wrap',
            listStyleType: 'none',
            ml: '0 !important',
            pl: 0,
            li: {
              ml: 0,
            },
          }}
        >
          <li
            sx={{
              fontWeight: 500,
              textTransform: 'uppercase',
              mr: 3,
              opacity: 0.8,
            }}
          >
            week {date}
          </li>
          {tags.map(tag => (
            <li sx={{ opacity: 0.7, mr: 2 }} key={tag}>
              {tag}
            </li>
          ))}
          {keywords.map(keyword => (
            <li sx={{ opacity: 0.7, mr: 2 }} key={keyword}>
              {keyword}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}
