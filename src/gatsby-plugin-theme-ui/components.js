import React from 'react'
import { Styled } from 'theme-ui'
import Prism from '@theme-ui/prism'
import ContextLink from '../components/mdx/context-link'

export default {
  pre: props => props.children,
  code: Prism,
  a: props =>
    (props.href.includes('/lessons/') && (
      <ContextLink
        for="lesson"
        slug={props.href.replace('https://egghead.io/lessons/', '')}
      >
        {props.children}
      </ContextLink>
    )) ||
    (props.href.includes('/courses/') && (
      <ContextLink
        for="course"
        slug={props.href.replace('https://egghead.io/courses/', '')}
      >
        {props.children}
      </ContextLink>
    )) || <Styled.a href={props.href}>{props.children}</Styled.a>,
}
