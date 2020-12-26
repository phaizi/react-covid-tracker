import React from 'react';
import {Bar} from 'react-chartjs-2';
import { useTheme } from "@material-ui/core/styles";

export default function BarGraph(props){
    
    const theme = useTheme();
    const data = {
          labels: props.labels,
          datasets: [
            {
              label: 'Covid Aggregate Dataset',
              backgroundColor: [
                  theme.palette.warning.main,
                  theme.palette.primary.main,
                  theme.palette.success.main,
                ],
              borderColor: [
                theme.palette.warning.light,
                theme.palette.primary.light,
                theme.palette.success.light,
                ],
              borderWidth: 1,
              hoverBackgroundColor: [
                theme.palette.warning.light,
                theme.palette.primary.light,
                theme.palette.success.light,
                ],
              hoverBorderColor: [
                theme.palette.warning.main,
                theme.palette.primary.main,
                theme.palette.success.main,
                ],
              data: props.data
            }
          ]
        };
    
        return (
            <div>
              <h2>{`${props.title}graph displaying aggregate stats for ${props.country}`}</h2>
              <Bar
                data={data}
                height={120}
                options={{
                  maintainAspectRatio: true
                }}
              />
            </div>
          );
    }