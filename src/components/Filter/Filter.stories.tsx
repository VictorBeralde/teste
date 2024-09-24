import { useState } from "react"
import { Button, Popover } from "@mui/material"
import Filter from "./Filter"

export default {
  title: 'Components/Filter'
}

export const Example = () => {
    // eslint-disable-next-line no-undef
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const openPopover = Boolean(anchorEl)
    const id = openPopover ? 'simple-popover' : undefined

    // eslint-disable-next-line no-undef
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  } 
  return (
    <>
    <Button onClick={handleClick}>
        Open Modal
    </Button>
    
    <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            disableAutoFocus={true}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Filter> a </Filter>
    </Popover>
    </>
  )
}