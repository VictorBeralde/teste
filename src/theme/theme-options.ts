import { ThemeOptions } from "@mui/material";

export const boaAcaoThemeOptions = (): ThemeOptions => ({ 
    typography: {
        fontFamily: 'Poppins',
        body1: {
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 'normal',
          lineHeight: '142.857%'
        },
        subtitle1: {
          fontSize: '42px'
        },
        subtitle2: {
            fontSize: '16px'
        },
        h1: {
          fontSize: '64px',
          fontWeight: 600,
          lineHeight: '2.375rem'
        },
        h4: {
            fontSize: '26px',
        },
        h6: {
            fontSize: '24px',
            fontWeight: 'normal'
        },
        h5: {
          fontSize: '48px',
        },
        h2: {
          fontSize: '10px',
        },
        body2: {
          fontSize: '32px'
        },
        h3: {
          fontSize: '38px',
        }
      }
})
