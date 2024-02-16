import { Grid, Paper, Typography } from "@mui/material";
import { LineChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";

const data = [
  { value: 5, label: 'A' },
  { value: 10, label: 'B' },
  { value: 15, label: 'C' },
  { value: 20, label: 'D' },
];

const size = {
  width: 400,
  height: 200,
};


export function DashBoard() {
  return (
    <Grid container mt={2} gap={1}>
      <Grid container component={Paper} item xs={12} sm={6} p={2}>
        <Typography fontWeight="bold" textAlign="start" color="#747474">
          Faixa etaria
        </Typography>
        <Grid container>
          <p style={{ color: '#747474' }}>Faixa etaria das assinaturas considerando titulares e dependentes</p>
        </Grid>
        <LineChart
          xAxis={[{ data: [0, 10, 20, 30, 40, 50, 60] }]}
          series={[
            {
              curve: 'linear',
              data: [10, 50, 100, 200, 500, 1000],
            },
          ]}
          height={300}
        />
      </Grid>
      <Grid container component={Paper} item xs={12} sm={5} p={2}>
        <Typography fontWeight="bold" textAlign="start" color="#747474">
          Faixa etaria
        </Typography>
        <Grid container>
          <p style={{ color: '#747474' }}>Faixa etaria das assinaturas considerando titulares e dependentes</p>
        </Grid>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label} (${item.value})`,
              arcLabelMinAngle: 45,
              data,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
          }}
          {...size}
        />
      </Grid>
    </Grid>
  )
}