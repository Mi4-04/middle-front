import { ChangeEvent, FocusEvent, FormEvent, ReactElement, useState } from 'react'
import { Close, Search } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Form } from './styles'

type SearchBarProps = {
  value?: string
  onChange?: (value: string) => void
}

export default function SearchBar(props: SearchBarProps): ReactElement {
  const { value = '', onChange } = props
  const [buffer, setBuffer] = useState<string>(value)
  const [prevState, setPrevState] = useState<string>(value)

  if (value !== prevState) {
    setBuffer(value)
    setPrevState(value)
  }

  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault()
    onChange?.(buffer)
  }

  const handleCancelClick = (): void => {
    onChange?.('')
  }

  const handleBlur = (event: FocusEvent<HTMLFormElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setBuffer(value)
    }
  }

  return (
    <Form onSubmit={handleFormSubmit} onBlur={handleBlur}>
      <TextField
        value={buffer}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setBuffer(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton onClick={handleCancelClick}>
              <Close />
            </IconButton>
          )
        }}
        variant="standard"
      />
    </Form>
  )
}
