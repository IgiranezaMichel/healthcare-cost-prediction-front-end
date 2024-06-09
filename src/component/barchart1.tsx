import { BarChart } from '@mui/x-charts/BarChart';
export default function StackBars() {
    return (
      <BarChart
        series={[
          { data: [35, 44, 24] },
        ]}
        height={290}
        xAxis={[{ data: ['Vaccine', 'Acetaminophen', 'Amitriptyline'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    );
  }