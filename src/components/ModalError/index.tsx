import { styled, css } from "@mui/system"
import { Modal as BaseModal } from "@mui/base/Modal"
import { CustomButton } from "../Button/styles"
import { Grid } from "@mui/material"

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 500px;
    gap: 8px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #D23130;
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      width: 300px;
    }

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      margin-bottom: 4px;
    }
  `,
)

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

type Props = {
  isState: boolean
  title: string
  description: string
  changeState: () => void
}

export function VModalError({
  changeState,
  isState,
  description,
  title,
}: Props) {
  return (
    <Modal open={isState} onClose={changeState}>
      <ModalContent>
        <h2 id="unstyled-modal-title" className="modal-title">
          {title}
        </h2>
        <p id="unstyled-modal-description" className="modal-description">
          {description}
        </p>
        <Grid container direction="row" gap={3}>
          <CustomButton
            variant="contained"
            onClick={changeState}
            color="error"
            sx={{ color: "#fff" }}
          >
            Confirmar
          </CustomButton>
        </Grid>
      </ModalContent>
    </Modal>
  )
}
