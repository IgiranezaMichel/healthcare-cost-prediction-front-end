/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarChart, axisClasses } from "@mui/x-charts"

 
 export const PIE_CHART_DEFAULT=(props:{data:any,label:any})=>{
  const chartSetting = {
    yAxis: [
      {
        label: 'rainfall (mm)',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
  return   <BarChart
  series={[
    { data: props.data ,label:'Price'},
  ]}
   xAxis={[{ data: props.label, scaleType: 'band',label:'year' }]}
  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
  {...chartSetting}
/>
}