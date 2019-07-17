/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'components/link'

const Button = ({
  to,
  children,
  kind = 'default',
  type = 'button',
  ...restProps
}) => {
  return to ? (
    <Link to={to} sx={{ variant: `buttons.${kind}` }} {...restProps}>
      {children}
    </Link>
  ) : (
    <button type={type} sx={{ variant: `buttons.${kind}` }} {...restProps}>
      {children}
    </button>
  )
}

export default Button
