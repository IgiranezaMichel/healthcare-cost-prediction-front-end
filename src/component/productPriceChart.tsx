import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart} from '@mui/x-charts/BarChart';
import { ProductDao } from '../controller/product';

interface DataItem {
  label: string;
  price: number;
  manufactureYear: number;
}

const ProductPriceStatistic: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [xLabels, setXLabels] = useState<number[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  const processData = (data: DataItem[]) => {
    const years = [...new Set(data.map(item => item.manufactureYear))];
    setXLabels(years);

    const labels = [...new Set(data.map(item => item.label))];
    const seriesData:any= labels.map(label => {
      return {
        label: label,
        id: `${label}Id`,
        data: years.map(year => {
          const item = data.find(d => d.manufactureYear === year && d.label === label);
          return item ? item.price : 0;
        })
      };
    });

    setSeries(seriesData);
  };

  useEffect(() => {
    const fetchAndProcessData = async () => {
        const productStatistic=new ProductDao().getAllProductPriceStatistics();
      setData((await productStatistic).data);
      processData((await productStatistic).data);
    };

    fetchAndProcessData();
  }, []);

  useEffect(() => {
    processData(data);
  }, [data]);

 

  return (
    <div>
      <BarChart
        height={300}
        series={series}
        xAxis={[{ data: xLabels, scaleType: 'band' }]}
      />
    </div>
  );
};

export default ProductPriceStatistic;
