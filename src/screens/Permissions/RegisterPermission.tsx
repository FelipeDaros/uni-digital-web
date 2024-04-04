import { useEffect, useRef, useState } from "react"
import { CustomButton } from "../../components/Button";
import { Checkbox, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, OutlinedInput, Paper, Typography, OutlinedInputProps, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { theme } from "../../styled";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../config/api";

import AddIcon from '@mui/icons-material/Add';
import { useToast } from "../../context/ToastContext";
import { ModalAddScreen } from "./Components/ModalAddScreen";
import { Loading } from "../../components/Loading";
import { LabelText } from "../FormRegisterClient/components/StepTwo/style";

type PropsFetch = {
  tela: string;
  permissoes: Permissao[];
};

type Permissao = {
  id: number;
  tipo: string;
  created_at: string;
};

export function RegisterPermission() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const [telas, setTelas] = useState<PropsFetch[]>([]);
  const [isStateModal, setIsStateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState("");
  const [ativa, setAtiva] = useState("");

  const perfilInputRef = useRef<HTMLInputElement>(null);


  const handleStateModal = () => setIsStateModal(!isStateModal);

  async function fetchData() {
    try {
      setLoading(true);
      let info = [] as PropsFetch[];

      if (id) {
        const { data } = await api.get(`/permissoes/funcao/show/${id}`)

        if (data.data.permissoes && typeof data === 'object') {
          const permissoesArray = Object.entries(data.data.permissoes);

          setChecked(data.data.permissaoFuncao.map((item: any) => item.id_permissao));

          setPerfil(data.data.funcao.nome)
          setAtiva(data.data.funcao.ativa)

          permissoesArray.forEach(([tela, permissoes]) => {
            const telaInfo = {
              tela,
              permissoes
            };
            // @ts-ignore
            info.push(telaInfo);
          });
        }
      } else {
        const { data } = await api.get('/permissoes/list');

        if (data && typeof data === 'object') {
          const permissoesArray = Object.entries(data.data);

          permissoesArray.forEach(([tela, permissoes]) => {
            const telaInfo = {
              tela,
              permissoes
            };
            // @ts-ignore
            info.push(telaInfo);
          });
        }
      }

      setTelas(info);
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        });
      }
    } finally {
      setLoading(false);
    }
  }


  async function handleAddScreen(dados: any) {
    if (!dados.nome) {
      return
    }

    const payload = {
      tela: String(dados.nome).trim()
    }

    try {
      setLoading(true);
      const { data } = await api.post('/permissoes/create', payload);
      showToast({
        color: 'success',
        message: data.message
      })
      fetchData();
      handleStateModal();
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        })
      }
    } finally {
      setLoading(false);
    }
  }

  const handleToggle = (value: number) => () => {
    // @ts-ignore
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // @ts-ignore
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  async function handleSave() {
    if (!perfil.trim()) {
      perfilInputRef.current?.focus();
      showToast({
        color: 'info',
        message: 'É necessário informar o nome do perfil'
      })
      return;
    }

    try {
      setLoading(true);

      if (id) {
        const payload = {
          nome: perfil,
          permissoes: checked,
          ativa
        }
        const { data } = await api.post(`/permissoes/funcao/update/${id}`, payload);

        showToast({ message: data.message, color: 'success' })
      } else {
        const payload = {
          nome: perfil,
          permissoes: checked
        }
        const { data } = await api.post('/permissoes/funcao/create', payload);
        showToast({ message: data.message, color: 'success' })
      }
    } catch (error: any) {
      if (!!error.response) {
        showToast({ message: error.response.data.message, color: 'error' })
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Loading isLoading={loading} />
      <Typography fontWeight="bold" textAlign="start">
        Perfil
      </Typography>
      <OutlinedInput
        disabled={!!id}
        ref={perfilInputRef}
        sx={{ marginTop: 2 }}
        id="outlined-adornment-weight"
        aria-describedby="outlined-weight-helper-text"
        color="success"
        size="small"
        placeholder="Informe o perfil"
        inputProps={{
          'aria-label': 'weight',
        }}
        value={perfil}
        onChange={e => setPerfil(e.target.value)}
      />
      <Grid mt={2} justifyContent="end" display="flex"
        sx={{
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
            justifyContent: "center"
          },
        }}>
        <CustomButton onClick={() => handleStateModal()} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
          TELA
        </CustomButton>
      </Grid>
      {id &&
        <Grid item xs={12}>
          <LabelText htmlFor="">Ativo</LabelText>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            onChange={e => setAtiva(e.target.value)}
            value={ativa}
            id="ativo"
            name="ativo"
          >
            <FormControlLabel
              value="1"
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
              label="Sim"
            />
            <FormControlLabel
              value="0"
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
              label="Não"
            />
          </RadioGroup>
        </Grid>
      }
      <Grid container gap={3}>
        {telas.length && telas.map(item => (
          <Paper key={item.tela} sx={{ width: 360, marginTop: 2, p: 2 }}>
            <Typography fontWeight="bold" textAlign="start">
              {item.tela}
            </Typography>
            <List>
              {item.permissoes.map((value) => {
                return (
                  <ListItem
                    key={value.id}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value.id)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          // @ts-ignore
                          checked={checked.indexOf(value.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          color="success"
                        />
                      </ListItemIcon>
                      <ListItemText primary={value.tipo} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        ))}
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
        <CustomButton onClick={handleSave} color="success" variant="contained">
          <Typography color="#fff">Salvar</Typography>
        </CustomButton>
        <CustomButton onClick={() => navigate('/permissions')} type="button" color="error" variant="outlined">
          <Typography>Voltar</Typography>
        </CustomButton>
      </Grid>
      <ModalAddScreen
        changeState={handleStateModal}
        isState={isStateModal}
        onOk={handleAddScreen}
      />
    </Grid >
  )
}
