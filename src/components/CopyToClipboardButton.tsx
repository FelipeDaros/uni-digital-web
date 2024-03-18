import { useState } from "react"
import { IconButton, Snackbar } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

type Props = {
  cod_bar: string;
}

export function CopyToClipboardButton({ cod_bar }: Props) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(cod_bar.toString())
  }

  return (
    <>
      <IconButton onClick={handleClick} color="primary">
        <ContentCopyIcon color="primary" />
      </IconButton>
      <Snackbar
        message="Código copiado com sucesso!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open} 
      />
    </>
  )
}
