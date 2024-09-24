import IconButton from '@mui/material/IconButton'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Typography } from '@mui/material'
import { HiOutlineX } from "react-icons/hi"

export type SearchProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string) => void;
  delay?: number;
  notClearable?: boolean;
  title?: string
};

export function Search(props: SearchProps) {
  const { delay, onChange, notClearable, title, ...textFieldProps } = props
  const [value, setValue] = useState(textFieldProps.value)

  const debounce = useDebouncedCallback(
    (value: string) => onChange(value),
    delay || 1
  )

  const handleClear = () => {
    setValue('')
    onChange('')
  }

  useEffect(() => {
    if (value !== textFieldProps.value) {
      setValue(textFieldProps.value)
    }
  }, [textFieldProps.value, value])

  return (
    <>
      <Typography
        variant='body2'
        color={(theme) => theme.palette.text.secondary}
        marginBottom={1}
      >
        {title || ''}
      </Typography>
      <TextField
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '50px',
            backgroundColor: '#D9D9D9'
          }
        }}
        name={props.name}
        {...textFieldProps}
        value={value}
        onChange={(event) => {
          setValue((event.target).value)
          debounce((event.target).value)
        }}
        InputProps={{
          endAdornment: !notClearable && (
            <IconButton
              sx={{ visibility: value ? 'visible' : 'hidden' }}
              onClick={handleClear}
            >
              <HiOutlineX />
            </IconButton>
          ) 
        }}
      />
    </>
  )
}