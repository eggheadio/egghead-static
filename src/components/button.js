/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from 'components/link'

const Button = ({ kind, to, type, sx, children, ...restProps }) => {
  return to ? (
    <Link to={to} sx={{ variant: `buttons.${kind}`, ...sx }} {...restProps}>
      {children}
    </Link>
  ) : (
    <button
      type={type}
      sx={{ variant: `buttons.${kind}`, ...sx }}
      {...restProps}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  kind: PropTypes.oneOf(['default', 'primary']),
  to: PropTypes.string,
  type: PropTypes.string,
  sx: PropTypes.object,
}

Button.defaultProps = {
  kind: 'default',
  type: 'button',
}

Button.displayName = 'Button'

export default Button
