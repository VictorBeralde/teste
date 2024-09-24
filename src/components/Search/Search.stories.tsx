import { useState } from 'react'
import { Search } from './Search'

export default {
  title: 'Components/Search'
}

export const Example = () => {
  const [value, setValue] = useState('')

  return (
    <>
      <Search
        label="Campanha"
        onChange={value => setValue(value)}
        value={value}
      />
      <div>Debounced value: {value}</div>
    </>
  )
}