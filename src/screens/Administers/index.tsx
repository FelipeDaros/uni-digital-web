import { useEffect, useState } from "react";
import { Grid, IconButton, OutlinedInput, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

import { api } from "../../config/api";

import { CustomButton } from "../../components/Button";
import { useToast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";

export function Administers() {
    const navigate = useNavigate();
    const { showToast, Toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [gridData, setGridData] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'nome',
            headerName: 'Nome',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
        },
        {
            field: 'documento',
            headerName: 'CPF',
            width: 200,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDeleteClick(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];


    const handleDeleteClick = async (id: number) => {
        try {
            setLoading(true)
            await api.post(`/auth/delete-admin/${id}`);
            showToast('Administrador excluído com sucesso!', 'success')
            fetchData();
        } catch (error: any) {
            if (!!error.response) {
                showToast(error.response.data.message, 'error')
            }
        } finally {
            setLoading(false)
        }

    };

    async function fetchData() {
        try {
            setLoading(true)
            const { data } = await api.get('/auth/list-admin', {
                params: {
                    pageSize: pageSize,
                    page: page
                }
            });

            const payload = {
                rows: data.data,
                columns,
                experimentalFeatures: true,

            }
            // @ts-ignore
            setGridData(payload)
        } catch (error: any) {
            if (!!error.response) {
                showToast(error.response.data.message, 'error')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, pageSize])

    return (
        <Grid margin={2} pt={4} pb={4}>
            <Typography fontWeight="bold" textAlign="start">
                Cadastro de administradores
            </Typography>
            <p>Cadastre os usuários administradores da plataforma</p>
            <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<SearchIcon />}
                aria-describedby="outlined-weight-helper-text"
                color="success"
                size="small"
                placeholder="Pesquisa rápida"
                inputProps={{
                    'aria-label': 'weight',
                }}
            />
            <Grid mt={2} justifyContent="end" display="flex">
                <CustomButton onClick={() => navigate('/register-administer')} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
                    Novo
                </CustomButton>
            </Grid>
            <Paper sx={{ width: '100%', marginTop: 2 }}>
                {gridData &&
                    <DataGrid
                        {...gridData}
                        initialState={{
                            pagination: { paginationModel: { pageSize: pageSize, page } },
                        }}
                        loading={loading}
                        pageSizeOptions={[5, 10, 20]}
                        onPaginationModelChange={e => {
                            setPage(e.page)
                            setPageSize(e.pageSize)
                        }}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        disableRowSelectionOnClick
                    />
                }
            </Paper>
            <Toast />
        </Grid >
    )
}