import { Stack, Typography } from "@mui/material";
import { Modal } from "../../../../components/Modal";
import MinhasDoacoesIcon from '../../../../assets/minhas-doacoes-icon.jpg';

export type ModalContentListProps = {
    title: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    content: { nome: string }[]
}

export function ModalContentList(props: ModalContentListProps) {
    return (
        <>
            <Modal
                title={props.title}
                open={props.open}
                setOpen={props.setOpen}
            >
                {props.content.map((item) => (
                    <Stack
                        key={item.nome}
                        width={'100%'}
                        display={'inline-flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        mb={1}
                    >
                        <img src={MinhasDoacoesIcon} alt="Minhas doações" style={{ width: '50px', height: '50px' }} />
                        <Typography variant="subtitle2" ml={2}>
                            {item.nome || ''}
                        </Typography>
                    </Stack>
                ))}
            </Modal>
        </>
    )
}