import { CardTriagem } from './CardTriagem';

export default {
    title: 'components/CardTriagem'
}

export const TriagemExample = () => { 
    return (
        <>
            <CardTriagem 
                titleCard='Doação de roupas'
                address='Rua 1, 123'
                idDonation='1'
                images={[]}
                setOpen={() => 'teste'}
                products={[]}
                setImages={() => 'teste'}
                setIdDonation={() => 'teste'}
                setProducts={() => 'teste'}
                setOpenProducts={() => 'teste'}
                dtDonation={new Date()}
                handleUpdateStatus={() => 'teste'}
            />
        </>
    )
}