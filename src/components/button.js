/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'components/link'

const Button = ({ to, children, type = 'default', ...restProps }) => {
  return to ? (
    <Link to={to} sx={{ variant: `buttons.${type}` }} {...restProps}>
      {children}
    </Link>
  ) : (
    <button sx={{ variant: `buttons.${type}` }} {...restProps}>
      {children}
    </button>
  )
}

export default Button
