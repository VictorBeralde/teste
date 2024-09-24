import { Comentario } from "./Comentario"

export default {
    title: 'components/Comentario'
}

export const Default = () => {
    return (
        <>
            <Comentario 
                idOng="1"
                setComments={() => {}}
                setOpen={() => {}}
            />
        </>
    )
}