import { TextField, TextFieldProps } from "@mui/material"
import { useField } from "@unform/core"
import { useEffect, useState } from "react"

type Props = TextFieldProps & {
  name: string
}

export function VTextField({ name, ...rest }: Props) {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name)

  const [value, setValue] = useState(defaultValue || "")

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [registerField, fieldName, value])

  return (
    <TextField
      error={!!error}
      helperText={error}
      value={value}
      defaultValue={defaultValue}
      onKeyDown={() => (error ? clearError() : undefined)}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  )
}
