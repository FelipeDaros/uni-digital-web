import { CssBaseline, Grid, InputAdornment, Typography } from "@mui/material";
import { ContainerBox, StyledContainer, Image } from "./styles";

import logo from "../../assets/logo-unidigital-horizontal-amarelo.png"
import { PermIdentity } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../../components/Button";
import { VTextField } from "../../components/Input/VTextField";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web"
import { useEffect, useRef, useState } from "react";
import { api } from "../../config/api";
import { Loading } from "../../components/Loading";
import { VModalNotification } from "../../components/ModalNotification";
import { useToast } from "../../components/Toast";


export function NewPassword() {
    const { showToast, Toast } = useToast();
    const { id } = useParams();
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true)
    const [disabled, setDisabled] = useState(false);

    const handleChangeIsValid = () => setIsValid(!isValid);

    async function verifyCode() {
        try {
            setLoading(true);
            const { data } = await api.get(`/auth/verify-code/${id}`);
            if (data.status === 'sucess') return setIsValid(true);
        } catch (error: any) {
            setDisabled(true);
            return setIsValid(false);
        } finally {
            setLoading(false);
        }

    }

    const handleSubmit = async (data: any) => {
        if (!data.password) {
            return
        }
        const payload = {
            ...data,
            cod_recuperacao: id
        }
        try {
            setLoading(true)
            await api.post(`/auth/update-password`, payload);
            navigate("/")
            showToast('Senha alterada com sucesso!', 'success')
        } catch (error: any) {
            if (!!error.response) {
                showToast(error.response.data.message, 'error')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        verifyCode()
    }, [])

    return (
        <StyledContainer>
            <Loading isLoading={loading} />
            <CssBaseline />
            <VModalNotification isState={!isValid} title="Alterar senha" description="O codigo informado nao esta mais disponivel" changeState={handleChangeIsValid} />
            <Image src={logo} />
            <ContainerBox>
                <Form placeholder="form" ref={formRef} onSubmit={handleSubmit}>
                    <Typography
                        fontWeight="bold"
                        fontSize={22}
                        marginBottom={4}
                        color="#28DA9D"
                        textAlign="center"
                    >
                        Cadastrar nova senha
                    </Typography>
                    <Typography
                        fontWeight="bold"
                        fontSize={14}
                        marginBottom={2}
                        textAlign="center"
                        color="GrayText"
                    >
                        Digite sua nova senha nos dois campos abaixo para a alteração.
                    </Typography>
                    <VTextField
                        disabled={disabled}
                        margin="normal"
                        required
                        fullWidth
                        id="usuario"
                        type="password"
                        color="success"
                        label="Senha"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <PermIdentity />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <VTextField
                        disabled={disabled}
                        margin="normal"
                        required
                        fullWidth
                        id="confirm-password"
                        type="password"
                        color="success"
                        label="Confirme sua senha"
                        name="confirm-password"
                        autoComplete="confirm-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <PermIdentity />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Grid container justifyContent="center">
                        <Grid item marginTop={2}>
                            <CustomButton
                                disabled={disabled}
                                type="submit"
                                color="success"
                                size="large"
                                variant="contained"
                            >
                                <Typography fontSize={14} color="white">
                                    Salvar nova senha
                                </Typography>
                            </CustomButton>
                        </Grid>
                    </Grid>
                </Form>
            </ContainerBox>
        </StyledContainer>
    )
}