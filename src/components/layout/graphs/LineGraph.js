import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from "@material-ui/core/styles";

export default function LineGraph(props) {

  const theme = useTheme();
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Daily Aggregate Infected Cases',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: theme.palette.primary.main,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: theme.palette.primary.main,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 10,
        pointHoverRadius: 20,
        pointHoverBackgroundColor: theme.palette.secondary.main,
        pointHoverBorderColor: theme.palette.secondary.main,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data,
      }
    ]
  };

  return (
    <div>
      <h2>{`${props.title}graph displaying daily aggregate stats for ${props.country} `}</h2>
      <Line data={data}
        height={120}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  )
}