import { Avatar, Button, Checkbox, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Typography } from "@mui/material";
import { CenteredContainer, LabelText, VisuallyHiddenInput } from "./style";
import { DependentTable } from "./DependentTable";
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore";
import { useRef, useState } from "react";
import { CreditCard } from "../CreditCard";
import { Form } from "@unform/web";
import { VTextField } from "../../../../components/Input/VTextField";
import { VSelect } from "../../../../components/Select/VSelect";
import { statesArray } from "../../../../utils/estados";
import { DependentForm } from "./DependentForm";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import * as XLSX from 'xlsx'
import { CustomButton } from "../../../../components/Button";
import axios from "axios";

type PropsXLSX = {
  nome: string;
  documento: string;
  email: string;
  dataNascimento: string
  sexo: string;
}

export function StepTwo() {
  const formRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [typePayment,
    handleChangePayment,
    acceptTerms,
    handleAcceptTerms,
    isLoading,
    handleAddDependente,
    dependentes,
    signature
  ] = FormRegisterClientStore((state) => [
    state.typePayment,
    state.handleChangePayment,
    state.acceptTerms,
    state.handleAcceptTerms,
    state.isLoading,
    state.handleAddDependente,
    state.dependentes,
    state.signature
  ]);

  function handleAvatarChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      //@ts-ignore
      setAvatarFile(URL.createObjectURL(file));
    }
  }


  async function handleAlterCep() {
    try {
      //@ts-ignore
      const cep = formRef.current?.getData()?.cep
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar CEP: ${response.status}`);
      }

      const data = await response.json();
      //@ts-ignore
      formRef.current?.setFieldValue({
        'uf': data.uf,
        'cidade': data.cidade
      })
    } catch (error) {
      console.error(error);
    }
  }

  function importXLS(data: any) {
    const reader = new FileReader();
    reader.readAsBinaryString(data.target.files[0]);
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData: PropsXLSX[] = XLSX.utils.sheet_to_json(sheet);

      parsedData.forEach(item => {
        // Check if the dependent with the same documento already exists
        const isDependentExists = dependentes.some(value => value.documento === item.documento);

        if (!isDependentExists) {
          handleAddDependente({
            dataNascimento: item.dataNascimento,
            documento: item.documento,
            email: item.email,
            nome: item.nome,
            sexo: item.sexo
          });
        }
      });
    };
  }

  async function handleSave(dados: any) {
    //@ts-ignore
    if (formRef.current?.getData()?.senha !== formRef.current?.getData()?.confirmarSenha) {
      window.alert('Senhas não conferem')
    }
    const formData = new FormData();
    formData.append('dados', dados);
    //@ts-ignore
    formData.append('signature', signature);
  }

  return (
    <CenteredContainer>
      {/* @ts-ignore */}
      <Form ref={formRef} onSubmit={(dados) => handleSave(dados)}>
        <Typography gutterBottom fontSize={12} sx={{ marginTop: 3, textAlign: 'center' }}>
          O titular é a pessoa responsável pelo aceite do contrato e pelo pagamento das mensalidades da Telemedicina Unimed.
        </Typography>
        <Avatar sx={{ width: 62, height: 62, marginTop: 6 }} alt="Remy Sharp" src={avatarFile ?? ""} />
        <CustomButton size="small" sx={{ marginTop: 4 }} component="label" variant="contained" startIcon={<CloudUploadIcon color="primary" />}>
          <Typography color="white">Enviar</Typography>
          <VisuallyHiddenInput type="file" accept=".png, .jpg, .jpeg" multiple={false} onChange={handleAvatarChange} />
        </CustomButton>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Nome</LabelText>
            <VTextField
              required
              size="small"
              id="nome"
              name="nome"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Data nascimento</LabelText>
            <VTextField
              required
              size="small"
              id="dataNascimento"
              name="dataNascimento"
              placeholder="Data"
              fullWidth
              type="date"
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">CPF/CNPJ</LabelText>
            <VTextField
              required
              size="small"
              id="documento"
              name="documento"
              fullWidth
              color="success"
              variant="standard"
              inputProps={{ maxLength: 11 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} marginTop={2}>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="N"
              name="radio-buttons-group"
            >
              <FormControlLabel value="M" control={<Radio sx={{
                color: '#28DA9D',
                '&.Mui-checked': {
                  color: '#28DA9D',
                },
              }} size="small" />} label="Masculino" />
              <FormControlLabel value="F" control={<Radio sx={{
                color: '#28DA9D',
                '&.Mui-checked': {
                  color: '#28DA9D',
                },
              }} size="small" />} label="Feminino" />
              <FormControlLabel value="N" control={<Radio sx={{
                color: '#28DA9D',
                '&.Mui-checked': {
                  color: '#28DA9D',
                },
              }} size="small" />} label="Não informar" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Typography gutterBottom fontWeight="bold" sx={{ marginTop: 6 }}>Contatos</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Fone</LabelText>
            <VTextField
              required
              size="small"
              id="fone"
              name="fone"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Celular</LabelText>
            <VTextField
              required
              size="small"
              id="celular"
              name="celular"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">E-mail</LabelText>
            <VTextField
              type="email"
              required
              size="small"
              id="email"
              name="email"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Typography fontWeight="bold" sx={{ marginTop: 6 }}>Endereço</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Cep</LabelText>
            <VTextField
              type="text"
              required
              size="small"
              id="cep"
              name="cep"
              fullWidth
              color="success"
              variant="standard"
              inputProps={{ maxLength: 8 }}
              onBlur={handleAlterCep}
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Endereço</LabelText>
            <VTextField
              type="text"
              required
              size="small"
              id="endereco"
              name="endereco"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Número</LabelText>
            <VTextField
              type="number"
              required
              size="small"
              id="numero"
              name="numero"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Bairro</LabelText>
            <VTextField
              type="text"
              required
              size="small"
              id="bairro"
              name="bairro"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Cidade</LabelText>
            <VTextField
              type="text"
              required
              size="small"
              id="cidade"
              name="cidade"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">UF</LabelText>
            <VSelect
              type="text"
              required
              size="small"
              id="uf"
              name="uf"
              fullWidth
              color="success"
              variant="standard"
            >
              {statesArray.map(item => (
                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
              ))}
            </VSelect>
          </Grid>
        </Grid>
        <Typography gutterBottom fontWeight="bold" sx={{ marginTop: 6 }}>Credenciais</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Senha</LabelText>
            <VTextField
              type="password"
              required
              size="small"
              id="senha"
              name="senha"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <LabelText htmlFor="">Confirmar senha</LabelText>
            <VTextField
              type="password"
              required
              size="small"
              id="confirmarSenha"
              name="confirmarSenha"
              fullWidth
              color="success"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Typography gutterBottom fontWeight="bold" sx={{ marginTop: 6 }}>Dependentes</Typography>
        <DependentForm />
        <DependentTable />
        <CustomButton sx={{ marginTop: 4 }} component="label" variant="contained" startIcon={<CloudUploadIcon color="primary" />}>
          <Typography color="white">Importar</Typography>
          <VisuallyHiddenInput type="file" accept=".xlsx, .xls, .ods" multiple={false} onChange={importXLS} />
        </CustomButton>
        <Typography gutterBottom fontWeight="bold" sx={{ marginTop: 6 }}>Pagamentos</Typography>
        <Grid item xs={12} sm={2} marginTop={2}>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={typePayment}
            defaultValue={typePayment}
            onChange={(value) => handleChangePayment(value.target.value)}
          >
            <FormControlLabel value="cartao" control={<Radio sx={{
              color: '#28DA9D',
              '&.Mui-checked': {
                color: '#28DA9D',
              },
            }} size="small" />} label="Cartão de crédito" />
            <FormControlLabel value="boleto" control={<Radio sx={{
              color: '#28DA9D',
              '&.Mui-checked': {
                color: '#28DA9D',
              },
            }} size="small" />} label="Boleto" />
            <FormControlLabel value="pix" control={<Radio sx={{
              color: '#28DA9D',
              '&.Mui-checked': {
                color: '#28DA9D',
              },
            }} size="small" />} label="PIX" />
          </RadioGroup>
        </Grid>
        {typePayment === 'cartao' && <CreditCard />}
        <Typography gutterBottom sx={{ marginTop: 6 }}>Os seus dados pessoais serão utilizados para processar a sua compra, apoiar a sua experiência em todo este site e para outros fins descritos na nossa Política de Privacidade.</Typography>
        <Grid container direction="row" sx={{ alignItems: 'center', marginTop: 6 }}>
          <Grid item xs={2} sm={1}>
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              value={acceptTerms}
              onChange={() => handleAcceptTerms()}
              sx={{
                color: '#28DA9D',
                '&.Mui-checked': {
                  color: '#28DA9D',
                },
              }}
            />
          </Grid>
          <Grid item xs={10} sm={8}>
            <Typography>Aceito os termos contidos em contrato. Download do contrato (PDF)</Typography>
          </Grid>
        </Grid>
        <Button sx={{ marginTop: 10, marginBottom: 5 }} disabled={isLoading} variant="outlined" color="success" type="submit">Finalizar compra</Button>
      </Form>
    </CenteredContainer >
  )
}