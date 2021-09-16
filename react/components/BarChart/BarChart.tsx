import React from 'react';
import { Chart } from "react-google-charts";
import { Spinner } from 'vtex.styleguide';
import styles from './BarChart.module.css';

const BarChart: StorefrontFunctionComponent<BarChartProps> = ({ data }) => {
  const sampleData: any = [
    [
      'Element',
      'Votos',
      { role: 'style' },
      {
        sourceColumn: 0,
        role: 'annotation',
        type: 'string',
        calc: 'stringify',
      },
    ],
  ]

  data.forEach(item => {
    sampleData.push([item.color, item.votes, `color: ${item.color}`, null]);
  });

  return (
    <section className={`${styles.BarChart}`}>
      <Chart
        chartType="ColumnChart"
        data={sampleData}
        loader={
          <div className="w-100 h-100 flex justify-center items-center">
            <Spinner />
          </div>
        }
        options={{
          height: 600,
          bar: { groupWidth: '95%' },
          legend: { position: 'none' },
        }}
        rootProps={{ 'data-testid': '6' }}
      />
    </section>
  )
}

export default BarChart;
