import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from "@material-ui/core/styles";

export default function DoughnutGraph(props) {

  const theme = useTheme();
  const data = {
    labels: props.labels,
    datasets: [{
      data: props.data,
      backgroundColor: [
        theme.palette.warning.main,
        theme.palette.primary.main,
        theme.palette.success.main,
      ],
      hoverBackgroundColor: [
        theme.palette.warning.light,
        theme.palette.primary.light,
        theme.palette.success.light,
      ],
    }]
  };
  return (
    <div>
      <h2>{`${props.title}graph displaying aggregate stats for ${props.country}`}</h2>
      <Doughnut data={data}
        height={120}
        options={{
          maintainAspectRatio: true
        }} />
    </div>
  )
}