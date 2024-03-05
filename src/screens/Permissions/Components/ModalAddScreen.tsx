import { styled, css } from "@mui/system"
import { Modal as BaseModal } from "@mui/base/Modal"
import { Grid } from "@mui/material"
import { Form } from "@unform/web"
import { useRef } from "react"
import { FormHandles } from "@unform/core"
import { LabelText } from "../../FormRegisterClient/components/StepTwo/style"
import { VTextField } from "../../../components/Input/VTextField"
import { CustomButton } from "../../../components/Button"

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
    border: 1px solid #28da9d;
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
  changeState: () => void
  onOk: (payload: any) => void
}

export function ModalAddScreen({
  changeState,
  isState,
  onOk
}: Props) {
  const formRef = useRef<FormHandles>(null)

  const onSubmit = (data: any) => {
    onOk(data);
  };

  return (
    <Modal open={isState} onClose={changeState}>
      <ModalContent>
        <Form ref={formRef} placeholder="form" onSubmit={onSubmit}>
          <h2 id="unstyled-modal-title" className="modal-title">
            Novo tela
          </h2>
          <Grid item xs={12} sm={4}>
            <LabelText>Nome</LabelText>
            <VTextField
              id="nome"
              name="nome"
              size="small"
              required
              color="success"
              fullWidth
              autoFocus
              type="text"
            />
          </Grid>
          <Grid container direction="row" gap={3} mt={3}>
            <CustomButton variant="outlined" onClick={changeState} color="error">
              Cancelar
            </CustomButton>
            <CustomButton
              variant="contained"
              onClick={onOk}
              color="success"
              type="submit"
              sx={{ color: "#fff" }}
            >
              Cadastrar
            </CustomButton>
          </Grid>
        </Form>
      </ModalContent>
    </Modal>
  )
}
