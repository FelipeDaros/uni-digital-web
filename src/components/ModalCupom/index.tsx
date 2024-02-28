import { styled, css } from "@mui/system"
import { Modal as BaseModal } from "@mui/base/Modal"
import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { api } from "../../config/api"
import { CustomButton } from "../Button"

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 600px;
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

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'codigo',
    headerName: 'codigo',
    width: 150,
    align: 'left'
  },
  {
    field: 'tipo',
    headerName: 'tipo',
    width: 200,
    align: 'left'
  },
  {
    field: 'valor',
    headerName: 'valor',
    type: 'number',
    width: 150,
    align: 'right'
  }
];

export function ModalCupom({
  changeState,
  isState,
  onOk
}: Props) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get(`/cupons/list`, {
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
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page])

  return (
    <Modal open={isState} onClose={changeState}>
      <ModalContent>
        {gridData &&
          <DataGrid
            {...gridData}
            initialState={{
              pagination: { paginationModel: { pageSize: pageSize, page } },
            }}
            loading={loading}
            onCellClick={onOk}
            pageSizeOptions={[10, 25, 50]}
            onPaginationModelChange={e => {
              setPage(e.page)
              setPageSize(e.pageSize)
            }}
          />
        }
        <CustomButton sx={{width: 200, alignSelf: 'flex-end'}} variant="outlined" onClick={changeState} color="error">
          Cancelar
        </CustomButton>
      </ModalContent>
    </Modal>
  )
}
