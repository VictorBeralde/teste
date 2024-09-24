import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import { Link } from 'react-router-dom'

export type RouterLinkProps = MuiLinkProps & { to: string }

export default function LinkRouter (props: RouterLinkProps) {
  return (
    <MuiLink
      component={Link}
      sx={{ textDecoration: 'none' }}
      {...props}
    />
  )
}