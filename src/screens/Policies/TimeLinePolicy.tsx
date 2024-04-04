import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { styled, css } from "@mui/system"
import { Modal as BaseModal } from "@mui/base/Modal"
import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { api } from '../../config/api';
import { Loading } from '../../components/Loading';
import { IPolicy } from '../../interfaces/IPolicy';
import { CustomButton } from '../../components/Button';

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 800px;
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

const TimeLineDiv = styled("div")(
  ({ theme }) => css`
    height: 500px;
    overflow-y: scroll;
  `
);

type Props = {
  tipo: string | null;
  isVisible: boolean;
  changeState: () => void;
}

export function TimeLinePolicy({ isVisible, changeState, tipo }: Props) {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<IPolicy[]>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get(`/politicas/show-tipo/${tipo}`);
      setPayload(data.data);
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          message: error.response.data.message,
          color: 'error'
        })
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isVisible) {
      fetchData();
    }
  }, [isVisible, tipo]);

  return (
    <Modal open={isVisible} onClose={changeState}>
      <ModalContent>
        <Typography fontWeight="bold" textAlign="center">
          Histórico das políticas de {tipo}
        </Typography>
        <Loading isLoading={loading} />
        {payload &&
          <TimeLineDiv>
            {payload.map(item => (
              <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="success" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{item.descricao}</TimelineContent>
                </TimelineItem>
              </Timeline>
            ))}
          </TimeLineDiv>
        }
        <Grid container direction="row" justifyContent="flex-end" gap={3}>
          <CustomButton variant="outlined" onClick={changeState} color="success">
            Fechar
          </CustomButton>
        </Grid>
      </ModalContent>
    </Modal>
  );
}
