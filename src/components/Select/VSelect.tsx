import { SelectChangeEvent, SelectProps, Select } from "@mui/material"
import { useField } from "@unform/core"
import { useEffect, useState } from "react"

interface VSelectProps extends SelectProps {
  name: string
}

export function VSelect({ name, ...rest }: VSelectProps) {
  const { fieldName, registerField, defaultValue, error } = useField(name)

  const [value, setValue] = useState<
    string | number | readonly string[] | undefined
  >(defaultValue || "")

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [registerField, fieldName, value])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(
      event.target.value as string | number | readonly string[] | undefined,
    )
  }

  return (
    <Select error={!!error} value={value} onChange={handleChange} {...rest} />
  )
}
