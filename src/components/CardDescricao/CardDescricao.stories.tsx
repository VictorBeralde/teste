import { CardDescricao } from "./CardDescricao"

export default {
    title: 'components/CardDescricao'
}

export const Example = () => {
    return (
        <>
            <CardDescricao 
                title="Título Teste"
                setContent={(content) => console.log(content)}
                setOpenContentList={() => console.log('open content list')}
                setTitle={(title) => console.log(title)}
                isLoading={false}
                ongs={[]}
                setOpen={() => console.log('open')}
            />
        </>
    )
}