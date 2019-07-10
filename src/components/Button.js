import { React } from 'react'
import { Link } from 'gatsby'
/** @jsx jsx */
import { jsx } from 'theme-ui'

const Button = ({ to, children, secondary, ...restProps }) => {
  return to ? (
    <Link
      to={to}
      sx={{ variant: `buttons.${secondary ? 'secondary' : 'primary'}` }}
      {...restProps}
    >
      {children}
    </Link>
  ) : (
    <button
      sx={{ variant: `buttons.${secondary ? 'secondary' : 'primary'}` }}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button
