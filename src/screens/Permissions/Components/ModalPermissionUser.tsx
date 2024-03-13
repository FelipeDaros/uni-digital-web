import { styled, css } from "@mui/system"
import { Modal as BaseModal } from "@mui/base/Modal"
import { Grid, MenuItem } from "@mui/material"
import { Form } from "@unform/web"
import { useEffect, useRef, useState } from "react"
import { FormHandles } from "@unform/core"
import { LabelText } from "../../FormRegisterClient/components/StepTwo/style"
import { VTextField } from "../../../components/Input/VTextField"
import { CustomButton } from "../../../components/Button"
import { useToast } from "../../../context/ToastContext"
import { api } from "../../../config/api"
import { Loading } from "../../../components/Loading"
import { IPerfil } from "../../../interfaces/IPerfil"
import { VSelect } from "../../../components/Select/VSelect"

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
  isState: boolean;
  userId: number;
  changeState: () => void;
  onOk: (payload: any) => void;
}

export function ModalPermissionUser({
  changeState,
  isState,
  onOk,
  userId
}: Props) {
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [perfils, setPerfils] = useState<IPerfil[]>([]);
  const { showToast } = useToast();

  const formRef = useRef<FormHandles>(null)

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get(`/permissoes/funcao/user/${userId}`);

      if (data.data.funcao) {
        // @ts-ignore
        formRef.current.setFieldValue("perfil", data.data.funcao.id)
        setPerfil(data.data.funcao.id);
      }

      // @ts-ignore
      formRef.current.setFieldValue("id", data.data.user.id)
      // @ts-ignore
      formRef.current.setFieldValue("nome", data.data.user.nome)
      // @ts-ignore
      formRef.current.setFieldValue("documento", data.data.user.documento)
    } catch (error: any) {
      if (!!error.response) {
        showToast({ message: error.response.data.message, color: 'error' })
      }
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (data: any) => {
    onOk(data);
  };

  async function fetchPerfils() {
    try {
      setLoading(true);
      const { data } = await api.get('/permissoes/funcao/list');
      setPerfils(data.data)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isState) {
      setPerfil(null);
      fetchData()
      fetchPerfils();
    }
  }, [isState])

  return (
    <Modal open={isState} onClose={changeState}>
      <>
        <Loading isLoading={loading} />
        <ModalContent>
          <Form ref={formRef} placeholder="form" onSubmit={onSubmit}>
            <h2 id="unstyled-modal-title" className="modal-title">
              Pefil do usuário
            </h2>
            <Grid item xs={12} sm={4} my={2}>
              <LabelText>ID</LabelText>
              <VTextField
                id="id"
                name="id"
                size="small"
                required
                color="success"
                fullWidth
                type="text"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4} my={2}>
              <LabelText>Nome</LabelText>
              <VTextField
                id="nome"
                name="nome"
                size="small"
                required
                color="success"
                fullWidth
                type="text"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4} my={2}>
              <LabelText>Documento</LabelText>
              <VTextField
                id="documento"
                name="documento"
                size="small"
                required
                color="success"
                fullWidth
                type="text"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4} my={2}>
              <LabelText>Perfil</LabelText>
              <VSelect
                type="text"
                id="perfil"
                name="perfil"
                fullWidth
                color="success"
                variant="standard"
                required
                value={perfil}
              >
                {perfils.length >= 1 && perfils.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nome}
                  </MenuItem>
                ))}
              </VSelect>
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
      </>
    </Modal>
  )
}
