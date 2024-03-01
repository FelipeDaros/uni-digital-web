import { FormHandles } from "@unform/core"
import { useRef, useState } from "react"
import { CustomButton } from "../../components/Button";
import { Container, MenuItem, Grid, Paper, Typography } from "@mui/material";
import { LabelText } from "../FormRegisterClient/components/StepTwo/style";
import { VTextField } from "../../components/Input/VTextField";
import { theme } from "../../styled";
import { Loading } from "../../components/Loading";
import { Form } from "@unform/web";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import { VSelect } from "../../components/Select/VSelect";
import { PropsPolicyType, typesPolicy } from "../../utils/typePolicy";
import { useToast } from "../../components/Toast";


export function RegisterPolicy() {
    const { showToast, Toast } = useToast();
    const navigate = useNavigate();
    const formRef = useRef<FormHandles>(null)
    const [loading, setLoading] = useState(false);
    const [tipo, setTipo] = useState("");

    async function handleSave(dados: any) {
        try {
            setLoading(true);
            const payload = {
                ...dados,
                tipo
            }
            await api.post('/politicas/store', payload);
            showToast('Política cadastrada com sucesso!', 'success')
            navigate('/policies');
        } catch (error: any) {
            if (!!error.response) {
                showToast(error.response.data.message, 'error')
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Loading isLoading={loading} />
            <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
                <Grid container spacing={2} component={Paper} pr={2} pb={2}>
                    <Grid p={2}>
                        <Typography fontWeight="bold" textAlign="start">
                            Informe os dados da política abaixo
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid>
                            <LabelText>Tipo</LabelText>
                        </Grid>
                        <VSelect
                            type="text"
                            required
                            size="small"
                            id="tipo"
                            name="tipo"
                            color="success"
                            variant="standard"
                            value={tipo}
                            onChange={(e: any) => setTipo(e.target.value)}
                            sx={{ width: 200 }}
                        >
                            {typesPolicy.map((item: PropsPolicyType) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}

                        </VSelect>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <LabelText>Descricao</LabelText>
                        <VTextField
                            size="small"
                            autoComplete="descricao"
                            name="descricao"
                            required
                            color="success"
                            fullWidth
                            id="descricao"
                            autoFocus
                            type="text"
                            multiline
                            rows={10}
                        />
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
                    <CustomButton type="submit" color="success" variant="contained">
                        <Typography color="#fff">Salvar</Typography>
                    </CustomButton>
                    <CustomButton onClick={() => navigate('/policies')} type="button" color="error" variant="outlined">
                        <Typography>Cancelar</Typography>
                    </CustomButton>
                </Grid>
            </Form>
        </Container>
    )
}
