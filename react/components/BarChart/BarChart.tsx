import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { Spinner } from 'vtex.styleguide';
import styles from './BarChart.module.css';

import getAllColors from './../../graphql/getAllColors.gql'
import { useQuery } from 'react-apollo'

const BarChart: StorefrontFunctionComponent = () => {
  const [colors, setColors] = useState<ColorsMetaData[]>()
  const [state, setState] = useState({
    isLoading: true,
    error: ""
  })
  const { loading, error, data } = useQuery(getAllColors, {
    ssr: false,
  });
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

  colors && colors.forEach(item => {
    sampleData.push([item.color, item.votes, `color: ${item.color}`, null]);
  });

  useEffect(() => {
    if (loading) setState(prevState => ({ ...prevState, isLoading: true }))
    if (error) setState(prevState => ({ ...prevState, error: error }))
    if (data) setColors(data.getAllColors?.colors)
  }, [loading, error, data])

  return (
    <section className={`${styles.BarChart}`}>
      <Chart
        className={styles.BarChartDiv}
        chartType="ColumnChart"
        data={sampleData}
        loader={
          <div className="w-100 h-100 flex justify-center items-center">
            <Spinner />
          </div>
        }
        options={{
          height: 600,
          width: 1000,
          bar: { groupWidth: '95%' },
          legend: { position: 'none' },
        }}
        rootProps={{ 'data-testid': '6' }}
      />
      {error && <p>{state.error}</p>}
    </section>
  )
}

export default BarChart;
