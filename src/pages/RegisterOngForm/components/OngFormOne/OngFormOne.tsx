import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import { createOngAtom } from "../../../../atoms/create-ong-atom";
import TextField from "../../../../components/TextField/TextField";

export function OngFormOne() {
    const [createOng, setCreateOng] = useAtom(createOngAtom)
    return (
        <>
            <Grid
                item
                xs={12}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
            >
                <Grid
                    xs={12}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    width={'100%'}
                >
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Razao Social*'}
                            type="text"
                            placeholder="Nome"
                            colorText="white"
                            value={createOng.nome}
                            onChange={(e) => setCreateOng({ ...createOng, nome: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                        />
                    </Grid>
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Email*'}
                            type="email"
                            placeholder="email@email.com"
                            colorText="white"
                            value={createOng.email}
                            onChange={(e) => setCreateOng({ ...createOng, email: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    width={'100%'}
                >
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'CNPJ*'}
                            type="text"
                            placeholder="xxx.xxx.xxx/xxxx-xx"
                            colorText="white"
                            value={createOng.cnpj}
                            onChange={(e) => setCreateOng({ ...createOng, cnpj: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                        />
                    </Grid>
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Senha*'}
                            type="password"
                            placeholder="********"
                            colorText="white"
                            value={createOng.senha}
                            onChange={(e) => setCreateOng({ ...createOng, senha: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}

                        />
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    width={'100%'}
                >
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Telefone*'}
                            type="text"
                            placeholder="(11) 11111-1111"
                            colorText="white"
                            value={createOng.telefone}
                            onChange={(e) => setCreateOng({ ...createOng, telefone: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                        />
                    </Grid>
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Confirmar senha*'}
                            type="password"
                            placeholder="********"
                            colorText="white"
                            value={createOng.confirmarSenha}
                            onChange={(e) => setCreateOng({ ...createOng, confirmarSenha: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}