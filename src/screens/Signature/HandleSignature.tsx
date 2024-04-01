import { Container, Grid, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";

import * as XLSX from "xlsx"

import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { CustomButton } from "../../components/Button";
import { VisuallyHiddenInput } from "./styles";
import { DependentForm } from "./DependentForm";
import { DependentTable } from "./DependentTable";
import { api } from "../../config/api";
import { IProduct } from "../../interfaces/IProduct";
import { NewSubscriptionCard } from "../../components/SubscriptionCard/newSubscriptionCard";
import { Loading } from "../../components/Loading";
import { useToast } from "../../context/ToastContext";
import { IUser } from "../../interfaces/IUser";
import { VModalConfirm } from "../../components/ModalConfirm";
import { useNavigate, useParams } from "react-router-dom";
import { StorePermissions } from "../../store/StorePermissions";
import { theme } from "../../styled";

type PropsXLSX = {
  nome: string
  documento: string
  email: string
  data_nascimento: string
  sexo: string
}

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

export function HandleSignature() {
  const [permissions] = StorePermissions((state) => [state.permissions]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<InfoProps>(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [produtos, setProdutos] = useState<IProduct[]>([]);
  const [productSelected, setProductSelected] = useState<IProduct>();
  const [isStateModal, setIsStateModal] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);

  const changeStateModal = () => setIsStateModal(!isStateModal);

  function importXLS(data: any) {
    const secundarioArray = [];
    const reader = new FileReader()
    reader.readAsBinaryString(data.target.files[0])
    reader.onload = (e: any) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData: PropsXLSX[] = XLSX.utils.sheet_to_json(sheet)

      if (parsedData.length > productSelected.qtd_secundario_padrao && productSelected.add_secundarios === 0) {
        showToast({
          color: 'info',
          message: 'A quantidade indicada no documento excede o limite permitido pelo produto.'
        });
        return;
      }

      parsedData.forEach((item) => {
        const secundario = {
          id: Number(item.documento),
          data_nascimento: item.data_nascimento,
          documento: item.documento,
          email: item.email,
          nome: item.nome,
          sexo: item.sexo
        }
        secundarioArray.push(secundario);
      })

      if (info && info.secundarios && info.secundarios.length) {
        info.secundarios.forEach((item) => {
          secundarioArray.push(item);
        });
      }

      setInfo((prevInfo) => ({
        ...prevInfo,
        secundarios: secundarioArray
      }));

      handleCalculate(productSelected, secundarioArray);
    }
  }

  async function handleSave() {
    if (info.secundarios.length < productSelected.qtd_secundario_padrao) {
      const restante = productSelected.qtd_secundario_padrao - info.secundarios.length
      showToast({
        color: 'info',
        message: `Você precisa informar o restante dos (dependentes/colaboradores) | faltam: ${restante} `
      });
      return;
    }
    try {
      setLoading(true)

      const payload = {
        qtd_secundario: info.secundarios.length,
        valor: valorTotal,
        id_produto: productSelected.id,
        secundarios: info.secundarios
      }

      const { data } = await api.post('/assinaturas/mudanca', payload, {
        params: {
          id_usuario: id
        }
      });
      window.localStorage.setItem("retorno_pagamento", JSON.stringify(data.data));
      window.location.reload()
    } catch (error: any) {
      console.log(error)
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

  async function fetchProdutos() {
    try {
      setLoading(true)
      const { data } = await api.get('/produtos/list-all');
      setProdutos(data.data);
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

  async function fetchData() {
    try {
      setLoading(true)
      const { data } = await api.get('/assinaturas/atual', {
        params: {
          id_usuario: id
        }
      });
      setInfo(data.data);
      setSelectedPayment(data.data.metodo);
      setProductSelected(data.data.produto);
      handleCalculate(data.data.produto, data.data.secundarios);
      formRef.current?.setFieldValue("tipo_pagamento", data.data.metodo);
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

  function handleRemove(user: IUser) {
    setInfo({
      ...info,
      secundarios: info.secundarios.filter(item => item.documento !== user.documento)
    });
  }

  function handleAddDependente(depente: SecundariosProps) {
    if (info.secundarios.length === productSelected.qtd_secundario_padrao && productSelected.add_secundarios === 0) {
      showToast({
        color: 'info',
        message: 'Limite atingido pelo produto'
      });
      return;
    }

    setInfo((prevInfo) => ({
      ...prevInfo,
      secundarios: [...prevInfo.secundarios, depente]
    }));
  }

  function handleSelect(produto: IProduct) {
    if (productSelected.add_secundarios === 1 && produto.add_secundarios !== 1 && produto.qtd_secundario_padrao === 0) {
      showToast({
        color: 'info',
        message: 'O produto selecionado não permite dependentes. Portanto, ao modificar sua assinatura, os (dependentes/colaboradores) serão removidos da sua conta.'
      });
    }

    if (produto.add_secundarios === 0 && info.secundarios.length > produto.qtd_secundario_padrao) {
      showToast({
        color: 'info',
        message: 'Seus (dependentes/colaboradores) foram resetados do fomulário.'
      });

      setInfo((prevInfo) => ({
        ...prevInfo,
        secundarios: []
      }));
    }

    handleCalculate(produto, info.secundarios)
    setProductSelected(produto);
  }

  function handleCalculate(produto: IProduct, secundarios: SecundariosProps[]) {
    let valorPorDependente = 0;
    console.log(produto)
    console.log(secundarios)
    if (produto.tipo === "PF" && produto.add_secundarios === 1) {
      valorPorDependente = 10;
      // @ts-ignore
      const calculo = ((secundarios.length * valorPorDependente) - produto.qtd_secundario_padrao) + parseFloat(produto.preco)
      setValorTotal(calculo);
    }

    if (produto.tipo === "PJ" && produto.add_secundarios === 1) {
      if (secundarios.length >= 1 && secundarios.length <= 10) {
        valorPorDependente = 27.90;
        // @ts-ignore
        let calculo = ((secundarios.length * valorPorDependente) - produto.qtd_secundario_padrao) + parseFloat(produto.preco)
        setValorTotal(calculo);
      }

      if (secundarios.length >= 11 && secundarios.length <= 29) {
        valorPorDependente = 26;
        // @ts-ignore
        let calculo = ((secundarios.length * valorPorDependente) - produto.qtd_secundario_padrao) + parseFloat(produto.preco)
        setValorTotal(calculo);
      }

      if (secundarios.length >= 30) {
        valorPorDependente = 23.72;
        // @ts-ignore
        let calculo = ((secundarios.length * valorPorDependente) - produto.qtd_secundario_padrao) + parseFloat(produto.preco)
        setValorTotal(calculo);
      }
    }

    if (produto.tipo === "PJ" && produto.add_secundarios === 0) {
      // @ts-ignore
      setValorTotal(parseFloat(produto.preco));
    }

    if (produto.tipo === "PF" && produto.add_secundarios === 0) {
      // @ts-ignore
      setValorTotal(parseFloat(produto.preco));
    }
  }

  useEffect(() => {
    fetchProdutos();
    fetchData();
  }, [])

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Loading isLoading={loading} />
      <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
        <Grid container mt={2} spacing={2} component={Paper} p={2}>
          <Grid p={2} container>
            <Typography fontWeight="bold" textAlign="start">
              Produtos
            </Typography>
          </Grid>
          <Grid container>
            {produtos && produtos.map(item => <NewSubscriptionCard key={item.id} handleSelected={() => handleSelect(item)} icon="UNIDIGITAL_DUPLO" produto={item} isSelected={productSelected && productSelected.id === item.id} />)}
          </Grid>
          {productSelected && (productSelected.qtd_secundario_padrao > 0 || productSelected.add_secundarios === 1) &&
            <>
              <Grid p={2} container>
                <Typography fontWeight="bold" textAlign="start">
                  Dependentes
                </Typography>
              </Grid>
              <DependentForm handleAddDependente={handleAddDependente} />
              {info && info.secundarios && <DependentTable secundarios={info.secundarios} handleRemove={handleRemove} />}
              <Grid p={2} container>
                <CustomButton
                  color="success"
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon color="primary" />}
                  disabled={!permissions.assinatura.find(item => item.tipo === "EDITAR")}
                >
                  <Typography color="white">Importar</Typography>
                  <VisuallyHiddenInput
                    type="file"
                    accept=".xlsx, .xls, .ods"
                    multiple={false}
                    onChange={importXLS}
                  />
                </CustomButton>
              </Grid>
            </>
          }
        </Grid>
        <Grid container display="flex" flexDirection="column" alignItems="start" mt={2} spacing={2} component={Paper}>
          <Grid p={2}>
            <Typography
              fontSize={16}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Valor total
            </Typography>
          </Grid>
          <Grid p={2}>
            <Typography
              fontSize={14}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {/* @ts-ignore */}
              {valorTotal.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </Typography>
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
        }}>
          <CustomButton disabled={!permissions.assinatura.find(item => item.tipo === "CRIAR")} type="submit" color="success" variant="contained">
            <Typography color="#fff">Alterar assinatura</Typography>
          </CustomButton>
          <CustomButton onClick={() => navigate(`/signature/${id}`)} type="button" color="error" variant="outlined">
            <Typography>Voltar</Typography>
          </CustomButton>
        </Grid>
        
      </Form>
      <VModalConfirm
        isState={isStateModal}
        changeState={changeStateModal}
        title="Alteração de assinatura"
        description="O produto escolhido não aceita dependentes, deseja continuar ?"
        onOk={() => { }}
        titleOk="Aceitar"
      />
    </Container>
  )
}