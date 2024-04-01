import { Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { CustomButton } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { useToast } from "../../context/ToastContext";
import { VModalConfirm } from "../../components/ModalConfirm";
import { useNavigate, useParams } from "react-router-dom";
import { theme } from "../../styled";
import { api } from "../../config/api";
import { IProduct } from "../../interfaces/IProduct";
import { NewSubscriptionCard } from "../../components/SubscriptionCard/newSubscriptionCard";
import { IUser } from "../../interfaces/IUser";
import { useAuth } from "../../context/AuthContext";
import { DependentTableList } from "./DependentTableList";
import { StorePermissions } from "../../store/StorePermissions";

type InfoProps = {
  produto: IProduct;
  secundarios: SecundariosProps[];
  metodo: string;
  cartao: any;
}

type SecundariosProps = {
  nome: string;
  documento: string;
  data_nascimento: Date | string;
  sexo: string;
  email: string;
}

export function Signature() {
  const [permissions] = StorePermissions((state) => [state.permissions]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [dados, setDados] = useState<InfoProps>(null);
  const [loading, setLoading] = useState(false);
  const [isStateModalCancelSignature, setIsStateModalCancelSignature] = useState(false);

  const handleStateCancelSignature = () => setIsStateModalCancelSignature(!isStateModalCancelSignature)


  function handleSiganture() {
    return navigate(`/handle-signature/${id}`);
  }

  async function handleCancelSignature() {

  }

  function handleRemove(user: IUser) {
    setDados({
      ...dados,
      secundarios: dados.secundarios.filter(item => item.documento !== user.documento)
    });
  }

  async function fetchData() {
    try {
      setLoading(true)
      const { data } = await api.get('/assinaturas/atual', {
        params: {
          id_usuario: id
        }
      });
      setDados(data.data)
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Loading isLoading={loading} />
      <Grid container mt={2} spacing={2} component={Paper} p={2}>
        <Grid p={2} container>
          <Typography fontWeight="bold" textAlign="start">
            Sua assinatura
          </Typography>
        </Grid>
        <Grid container>
          {dados && <NewSubscriptionCard key={dados.produto.id} handleSelected={() => { }} icon="UNIDIGITAL_DUPLO" produto={dados.produto} isSelected={true} />}
        </Grid>
        <Grid mt={2}>
          <Grid p={2}>
            <Typography fontWeight="bold" textAlign="start">
              Seus (dependentes/colaboradores)
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          {dados && dados.secundarios && <DependentTableList secundarios={dados.secundarios} handleRemove={handleRemove} />}
        </Grid>
      </Grid>
      <Grid
        direction="row"
        display="flex"
        gap={1}
        marginTop={2}
        container
        sx={{
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          },
        }}
      >
        <CustomButton disabled={!permissions.assinatura.find(item => item.tipo === "EDITAR")} type="submit" color="success" variant="contained" onClick={handleSiganture}>
          <Typography color="#fff">Alterar assinatura</Typography>
        </CustomButton>
        <CustomButton disabled={!permissions.assinatura.find(item => item.tipo === "DELETAR")} onClick={handleStateCancelSignature} type="button" color="error" variant="outlined">
          <Typography>Cancelar assinatura</Typography>
        </CustomButton>
      </Grid>
      <VModalConfirm
        onOk={handleCancelSignature}
        changeState={handleStateCancelSignature}
        isState={isStateModalCancelSignature}
        description="Para nos ajudar a melhorar, favor informar o motivo do cancelamento"
        title="Cancelamento UniDigital"
        titleOk="Confirmar Cancelamento"
      />
    </Container>
  )
}