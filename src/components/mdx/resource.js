/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import { Box, Card, Image, Link } from '@theme-ui/components'
import { useStaticQuery, graphql } from 'gatsby'
import { get } from 'lodash'

export default function Resource({ type, ...props }) {
  const { allLesson, allCourse } = useStaticQuery(
    graphql`
      {
        allLesson {
          nodes {
            slug
            title
            thumb_nail
            duration
            summary
            http_url
            instructor {
              avatar_64_url
              full_name
              http_url
            }
            primary_tag {
              label
              image_64_url
            }
          }
        }
        allCourse {
          nodes {
            slug
            title
            square_cover_256_url
            duration
            summary
            free_forever
            http_url
            instructor {
              avatar_64_url
              full_name
              http_url
            }
            primary_tag {
              label
              image_url
            }
            lessons {
              http_url
            }
          }
        }
      }
    `,
  )

  function Wrapper({ data, ...props }) {
    return (
      <Card variant="resource" {...props}>
        <Image
          src={
            data.square_cover_256_url ||
            get(data, 'primary_tag.image_64_url') ||
            data.image
          }
          alt={data.title}
        />
        <Box>
          <Styled.h3>
            <Link href={data.http_url} sx={{ lineHeight: 1.4 }}>
              {data.title} <i>by</i>{' '}
              <Image
                sx={{
                  maxWidth: 32,
                  borderRadius: '50%',
                  position: 'relative',
                  bottom: '-6px',
                  mr: '4px',
                }}
                alt={data.instructor.full_name}
                variant="instructor"
                src={get(data, 'instructor.avatar_64_url')}
              />
              <i>{data.instructor.full_name}</i>
            </Link>
          </Styled.h3>
          {props.children}
        </Box>
      </Card>
    )
  }

  function resourceByType(type) {
    switch (type) {
      case 'course':
        return allCourse.nodes.map(
          course =>
            course.slug === props.slug && (
              <Wrapper key={course.slug} data={course}>
                {props.children}
              </Wrapper>
            ),
        )
      case 'lesson':
        return allLesson.nodes.map(
          lesson =>
            lesson.slug === props.slug && (
              <Wrapper key={lesson.slug} data={lesson}>
                {props.children}
              </Wrapper>
            ),
        )
      default:
        return (
          <Wrapper
            key={props.url}
            data={{
              title: props.title,
              image: props.image,
              http_url: props.url,
              instructor: {
                full_name: props.instructorName,
                avatar_64_url: props.instructorImage,
              },
            }}
          >
            {props.children}
          </Wrapper>
        )
    }
  }
  return resourceByType(type)
}
