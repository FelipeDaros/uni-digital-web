import { styled, css } from "@mui/system"
import { Modal as BaseModal } from "@mui/base/Modal"
import { CustomButton } from "../Button/styles"
import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material"
import { LabelText } from "../../screens/FormRegisterClient/components/StepTwo/style"
import { Form } from "@unform/web"
import { useRef } from "react"
import { FormHandles } from "@unform/core"
import { VTextField } from "../Input/VTextField"

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
  onOk: () => void
}

export function ModalAddDependets({
  changeState,
  isState,
  onOk
}: Props) {
  const formRef = useRef<FormHandles>(null)

  function handleSave(dados: any) {
    console.log(dados)
  }


  return (
    <Modal open={isState} onClose={changeState}>
      <ModalContent>
        <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
          <h2 id="unstyled-modal-title" className="modal-title">
            Novo dependente
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
          <Grid item xs={12} sm={4}>
            <LabelText>CPF</LabelText>
            <VTextField
              id="cpf"
              name="cpf"
              size="small"
              required
              color="success"
              fullWidth
              autoFocus
              inputProps={{ maxLength: 11, pattern: '[a-z]' }}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LabelText>Data nascimento</LabelText>
            <VTextField
              id="data_nascimento"
              name="data_nascimento"
              size="small"
              required
              color="success"
              fullWidth
              autoFocus
              type="date"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LabelText>Email</LabelText>
            <VTextField
              id="email"
              name="email"
              size="small"
              required
              color="success"
              fullWidth
              autoFocus
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Sexo</LabelText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="N"
              id="sexo"
              name="sexo"
            >
              <FormControlLabel
                value="M"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Masculino"
              />
              <FormControlLabel
                value="F"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Feminino"
              />
              <FormControlLabel
                value="N"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Não informar"
              />
            </RadioGroup>
          </Grid>
          <Grid container direction="row" gap={3}>
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
