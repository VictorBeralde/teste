import { ImageSelect } from "./ImageSelect"

export default {
    title: 'Components/ImageSelect',
}

export const Default = () => {
    return (
        <ImageSelect
            handleClickDelete={() => console.log('Delete')}
            src=""
            index={1}
        />
    )
}