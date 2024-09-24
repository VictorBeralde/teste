import { useParams } from "react-router-dom"
import { useUpdateCollectionPointById } from "../../../hooks/useCollectionPoints/use-update-collection-points-by-id"
import { useCollectionPointById } from "../../../hooks/useCollectionPoints/use-colleciton-point-by-id"
import { useEffect } from "react"
import { useAtom } from "jotai"
import { upsertCollectionPointsAtom } from "../../../atoms/upsert-collection-points"
import { UpsertCollectionPoints } from "../components/UpsertCollectionPoints"
import { isError } from "util"
import { CircularProgress, Typography } from "@mui/material"

export function UpdateCollectionPointsById() {
    const { idCollection } = useParams<{ idCollection: string }>()
    const { data, isLoading, isError } = useCollectionPointById(idCollection || '')
    const [collectionPointsAtom, setCollectionPointsAtom] = useAtom(upsertCollectionPointsAtom)

    useEffect(() => {
        setCollectionPointsAtom({
            bairro: '',
            cep: '',
            cidade: '',
            complemento: '',
            dataDisponivel: new Date(),
            descricao: '',
            horarioFuncionamento: '',
            logradouro: '',
            nome: '',
            numero: '',
            urlBanner: null
        })


        if (data) {
            setCollectionPointsAtom({
                bairro: data.endereco.bairro,
                cep: data.endereco.cep,
                cidade: data.endereco.cidade,
                complemento: data.endereco.complemento,
                dataDisponivel: data.dataDisponivel,
                descricao: data.descricao,
                horarioFuncionamento: data.horarioFuncionamento,
                logradouro: data.endereco.logradouro,
                nome: data.nome,
                numero: `${data.endereco.numero}`,
                urlBanner: {
                    name: 'Imagem 0',
                    src: data.urlImagem
                },
            })
        }
    }, [])

    return (
        <>
            {isLoading && <CircularProgress />}
            {isError && <Typography variant="h6" mt={4}>Erro ao carregar ponto de coleta</Typography>}
            {data && 
            <UpsertCollectionPoints
                variant="update"
                id={idCollection}
            />}
        </>
    )
}