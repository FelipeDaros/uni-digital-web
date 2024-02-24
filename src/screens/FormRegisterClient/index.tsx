import { Grid } from "@mui/material"
import { Steps } from "./components/Steps"
import { FormRegisterClientStore } from "./store/FormRegisterClientStore"
import { StepTwo } from "./components/StepTwo"
import { StepOne } from "./components/StepOne"
import { Loading } from "../../components/Loading"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { api } from "../../config/api"



export function FormRegisterClient() {
  const { id } = useParams();
  const [step, isLoading, handleProduct, handleLoading] = FormRegisterClientStore((state) => [state.step, state.isLoading, state.handleProduct, state.handleLoading])

  async function fetchSingnature() {
    try {
      handleLoading()
      const { data } = await api.get(`/produtos/show/${id}`);
      handleProduct(data.data)
    } catch (error) {

    } finally {
      handleLoading()
    }
  }


  useEffect(() => {
    // @ts-ignore
    fetchSingnature();
  }, [])

  return (
    <Grid pb={3} container flexDirection="column">
      <Loading isLoading={isLoading} />
      <Grid mt={3}>
        <Steps />
      </Grid>
      {step === 0 &&
        <Grid>
          <StepOne />
        </Grid>
      }
      {step === 1 &&
        <Grid>
          <StepTwo />
        </Grid>
      }
    </Grid>
  )
}
