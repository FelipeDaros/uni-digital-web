import { Backdrop, Grid, Typography } from "@mui/material"
import { Steps } from "./components/Steps"
import { FormRegisterClientStore } from "./store/FormRegisterClientStore"
import { StepTwo } from "./components/StepTwo"
import { StepOne } from "./components/StepOne"
import { Loading } from "../../components/Loading"



export function FormRegisterClient() {
  const [step, isLoading] = FormRegisterClientStore((state) => [state.step, state.isLoading])
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
