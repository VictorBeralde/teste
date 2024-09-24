import { BreadCrumbs } from "./BreadCrumbs"

export default {
    title: 'Components/Breadcrumbs'
}

const data = [
    {to: '/home', label: 'Home'},
    {to: '/about', label: 'About'},
    {to: '/contact', label: 'Contact'}
]

export const Example = () => (
    

   <BreadCrumbs 
        items={data}
   />
)