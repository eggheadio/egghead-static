import React from "react"
import GatsbyLink from "gatsby-link"

const Link = ({ children, to, ...restProps }) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink to={to} {...restProps}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...restProps}>
      {children}
    </a>
  )
}

export default Link
