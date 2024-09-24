import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import QRCode from 'qrcode.react';
import { QrCodePix } from 'qrcode-pix';
import { enqueueSnackbar } from 'notistack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export type PixQRCodeProps = {
    pixKey: string;
};

export function PixQRCode(props: PixQRCodeProps) {
    const { pixKey } = props;
    const [qrCodeValue, setQrCodeValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const generatePixPayload = async () => {
            try {
                const payload = await QrCodePix({
                    version: '01',
                    key: pixKey,
                    city: 'São Paulo',
                    name: 'Felipe Dourado',
                }).payload();
                setQrCodeValue(payload);
            } catch (error) {
                setError(true);
                enqueueSnackbar('Erro ao gerar QR Code Pix, utilize a chave Pix abaixo', { variant: 'error' });
                console.error('Erro ao gerar QR Code Pix:', error);
            }
        };

        generatePixPayload();
    }, [pixKey]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100%">
            {qrCodeValue && !error ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Escaneie o QR Code para pagar via Pix
                    </Typography>
                    <QRCode value={qrCodeValue} size={256} />
                </>
            ) : (
                <>
                    {error ? (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <ErrorOutlineIcon color="error" style={{ fontSize: 100, marginBottom: '20px' }} />
                            <Typography variant="body1" align="center" gutterBottom style={{ fontSize: '1.5rem' }}>
                                Não foi possível carregar o QR Code da campanha. Faça sua doação diretamente para a chave Pix da ONG:
                                <br />
                                <Typography variant="body1" component="span" style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>
                                    EMAIL: {pixKey}
                                </Typography>
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <CircularProgress />
                            <Typography variant="body1" gutterBottom>
                                Carregando QR Code Pix...
                            </Typography>
                        </>
                    )}
                </>
            )}
        </Box>
    );
}