import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export type TextFieldProps = MuiTextFieldProps & {
    colorText?: string
};

export default function TextField(props: TextFieldProps) {
    const { colorText, label, ...inputProps } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                margin: 0,
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <FormLabel
                error={props.error}
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column'
                }}
            >
                {label && <div style={{ color: colorText ?? 'black' }}>{props.label}</div>}
                <MuiTextField
                    variant="outlined"
                    sx={{
                        width: '100%',
                        '& .MuiInputBase-root': {
                            borderRadius: '20px',
                            backgroundColor: '#D9D9D9',
                        }
                    }}
                    {...inputProps}
                />
            </FormLabel>
        </Box>
    );
}
