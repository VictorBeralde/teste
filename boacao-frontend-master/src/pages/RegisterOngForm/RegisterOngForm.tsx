import { Button, Grid } from "@mui/material";
import { SliderProgress } from "../../components/SliderProgress";
import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { OngFormOne } from "./components/OngFormOne";
import { OngFormTwo } from "./components/OngFormTwo";
import { OngFormThree } from "./components/OngFormThree";
import { OngFormFour } from "./components/OngFormFour";
import { useAtom } from "jotai";
import { createOngAtom, CreateOngType } from "../../atoms/create-ong-atom";
import { useCreateOng } from "../../hooks/useOng/use-create-ong";

export function RegisterOngForm() {
    const [createOng, setCreateOng] = useAtom(createOngAtom)
    const [size, setSize] = useState<number>(0)
    const [formSize] = useState<number[]>([0, 1, 2, 3])
    const { mutateAsync: createOngHook } = useCreateOng()
    const navigate = useNavigate()

    const handleClickBack = () => {
        if (size > 0) {
            setSize(size - 1);
        } else {
            navigate(`/cadastrar/ong`);
        }
    }

    const handleClickNext = () => {
        if (size === 3) {
            createOngHook({
                bairro: createOng.bairro,
                cep: createOng.cep,
                cidade: createOng.cidade,
                cnpj: createOng.cnpj ?? '',
                complemento: createOng.complemento,
                descricao: createOng.descricao,
                email: createOng.email,
                senha: createOng.senha,
                estado: createOng.estado,
                horarioFuncionamento: 'Quinta e Sexta das 8h às 18h',
                imagem: createOng.imagem[0].src,
                linkSite: createOng.linkSite,
                logradouro: createOng.logradouro,
                nome: createOng.nome,
                numero: createOng.numero ?? 0,
                certificado: createOng.certificado,
                plano: createOng.plano,
                telefones: [createOng.telefone ? createOng.telefone : ''],
                tipoCertificado: createOng.tipoDoCertificado
            })
        } else {
            setSize(size + 1)
        }
    }

    useEffect(() => {
        setCreateOng((prev: CreateOngType) => ({
            nome: '',
            cnpj: '',
            telefone: '',
            email: '',
            cep: '',
            logradouro: '',
            numero: 0,
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            senha: '',
            confirmarSenha: '',
            plano: prev.plano,
            imagem: [],
            linkSite: '',
            descricao: '',
            horarioFuncionamento: '',
            certificado: '',
            tipoDoCertificado: '',
        }));
        
    }, []);
    

    return (
        <>
            <Grid
                container
                xs={12}
                display={'flex'}
                sx={{
                    backgroundColor: '#11111F'
                }}
                minHeight={'100vh'}
            >
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    paddingLeft={3}
                    marginBottom={0}
                >
                    {size < 4 &&
                        <HiArrowLeft style={{ fontSize: '35px', cursor: 'pointer', color: 'white' }} onClick={handleClickBack} />
                    }
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    gap={2}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    marginTop={0}
                    paddingTop={0}
                >
                    {size < 4 && formSize.map((_s, index) => (
                        <SliderProgress
                            key={index}
                            number={size}
                            indexPosition={index}
                            color="white"
                        />
                    ))}
                </Grid>

                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {size === 0 && <OngFormOne />}
                    {size === 1 && <OngFormTwo />}
                    {size === 2 && <OngFormThree />}
                    {size === 3 && <OngFormFour />}
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Button
                        sx={{
                            backgroundColor: '#375A88',
                            color: '#fff',
                            fontWeight: 'bold',
                            paddingBottom: 2,
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 2,
                            borderRadius: 4,
                            fontSize: 20,
                        }}
                        variant="contained"
                        onClick={handleClickNext}
                    >
                        {size === 4 ? 'Início' : size === 3 ? 'Finalizar' : 'Continuar'}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}