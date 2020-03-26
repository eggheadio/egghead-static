/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import { get, truncate } from 'lodash'
import formatDuration from '../../utils/formatDuration'
import Tippy from '@tippyjs/react'
import { inlinePositioning } from 'tippy.js'
import 'tippy.js/themes/light.css'
import 'tippy.js/dist/tippy.css'
import Markdown from 'react-markdown'
import { FreeForever, Play } from '../icons'

export default function ContextLink(props) {
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

  function resourceByType(type) {
    switch (type) {
      case 'lesson':
        return (
          <>
            {allLesson.nodes.map(
              lesson =>
                lesson.slug === props.slug && (
                  <Tippy
                    key={lesson.slug}
                    content={
                      <div>
                        <Markdown
                          source={lesson.summary}
                          sx={{
                            fontSize: 16,
                            maxHeight: 150,
                            overflow: 'auto',
                            pt: 2,
                            px: 2,
                            a: { color: 'primary' },
                            p: {
                              mb: 2,
                            },
                          }}
                        />
                        <span
                          sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <a
                            href={lesson.instructor.http_url}
                            sx={{
                              color: 'text',
                              mr: 1,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              sx={{
                                borderRadius: '50%',
                                mr: '4px',
                                maxWidth: 32,
                              }}
                              src={lesson.instructor.avatar_64_url}
                            />{' '}
                            {lesson.instructor.full_name}
                          </a>
                          <span>{formatDuration(lesson.duration)}</span>
                        </span>
                      </div>
                    }
                    placement="top"
                    plugins={[inlinePositioning]}
                    inlinePositioning={true}
                    theme="light"
                    interactive={true}
                    interactiveBorder={5}
                    touch={false}
                  >
                    <Styled.a
                      href={`https://egghead.io/lessons/${lesson.slug}`}
                      sx={{
                        display: 'inline',
                      }}
                    >
                      {lesson.primary_tag && (
                        <img
                          sx={{
                            maxWidth: [24, 32],
                            bottom: ['-6px', '-9px'],
                            mr: '4px',
                            position: 'relative',
                          }}
                          src={get(lesson, 'primary_tag.image_64_url')}
                        />
                      )}

                      {props.children}
                    </Styled.a>
                  </Tippy>
                ),
            )}
          </>
        )
      case 'course':
        return (
          <>
            {allCourse.nodes.map(
              course =>
                course.slug === props.slug && (
                  <Tippy
                    key={course.slug}
                    content={
                      <div>
                        <Markdown
                          source={course.summary}
                          sx={{
                            fontSize: 16,
                            maxHeight: 150,
                            overflow: 'auto',
                            pt: 2,
                            px: 2,
                            a: { color: 'primary' },
                            p: {
                              mb: 2,
                            },
                          }}
                        />
                        {course.free_forever && (
                          <div
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              px: 2,
                              py: 1,
                              bg: '#FFFFF0',
                              color: '#ECC94B',
                              borderRadius: 3,
                              fontSize: 13,
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                              svg: { mr: 1 },
                            }}
                          >
                            <FreeForever />
                            community resource
                          </div>
                        )}
                        <span
                          sx={{
                            mt: course.free_forever ? 0 : 1,
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div
                            sx={{
                              mr: 1,
                              display: 'flex',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <img
                              sx={{
                                borderRadius: '50%',
                                mr: '4px',
                                maxWidth: 32,
                              }}
                              src={course.instructor.avatar_64_url}
                            />{' '}
                            {course.instructor.full_name}
                            {', '}
                            {formatDuration(course.duration)}
                          </div>
                          <div
                            sx={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <a
                              href={course.lessons[0].http_url}
                              sx={{
                                px: 1,
                                pr: 2,
                                py: 1,
                                bg: 'primary',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'background',
                                borderRadius: 3,
                                fontSize: 13,
                                svg: {
                                  mr: '2px',
                                },
                              }}
                            >
                              <Play />
                              Start Watching
                            </a>
                          </div>
                        </span>
                      </div>
                    }
                    placement="top"
                    plugins={[inlinePositioning]}
                    inlinePositioning={true}
                    theme="light"
                    interactive={true}
                    interactiveBorder={5}
                    touch={false}
                  >
                    <Styled.a
                      href={`https://egghead.io/courses/${course.slug}`}
                    >
                      <img
                        sx={{
                          maxWidth: [24, 32],
                          position: 'relative',
                          bottom: ['-6px', '-9px'],
                          marginRight: '4px',
                        }}
                        src={course.primary_tag.image_url}
                      />
                      {props.children}
                    </Styled.a>
                  </Tippy>
                ),
            )}
          </>
        )
    }
  }

  return resourceByType(props.for)
}
