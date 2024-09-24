import { Box, Breadcrumbs, Typography } from "@mui/material"
import LinkRouter from "../Link/LinkRouter"
import { RiHome2Fill } from 'react-icons/ri'

export type BreadCrumbItems = {
    to: string,
    label: string
}

export type BreadCrumbsProps = {
    items: BreadCrumbItems[]
}


export function BreadCrumbs (props: BreadCrumbsProps) {
    const { items } = props
    return (
        <>
            <Breadcrumbs>
                {items.map((item) => (
                    <Component key={item.label} item={item} />
                ))}
            </Breadcrumbs>
        </>
    )
}

function Component (props: {item: BreadCrumbItems }) {
    const { item } = props
  
    return (
      <>
        {item.to && (
          <LinkRouter
            key={item.label}
            to={`/${item.to}`}
            underline='hover'
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'black' }}>
              {item.to === '/' && <RiHome2Fill />}
              <span>{item.label}</span>
            </Box>
          </LinkRouter>
        )}
        {!item.to && (
          <Typography key={item.label}>
            {item.label}
          </Typography>
        )}
      </>
    )
  }