import { useState } from "react"
import { Menu } from "./Menu"

export default {
    title: 'Components/Menu'
}


export const Example = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Menu 
                open={open}
                setOpen={setOpen}
                variant="permanent"
            />
        </>
    )
}