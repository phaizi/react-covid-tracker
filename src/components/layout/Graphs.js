import React, { useContext } from 'react';
import { GlobalDataContext, CountriesContext, DailyDataContext } from '../../constants/context';
import BarGraph from './graphs/BarGraph';
import LineGraph from './graphs/LineGraph';
import PieGraph from './graphs/PieGraph';
import PolarGraph from './graphs/PolarGraph';
import DoughnutGraph from './graphs/DoughnutGraph';


export default function Graphs(props) {

  const { selectedCountry } = useContext(CountriesContext);
  const globalData = useContext(GlobalDataContext);
  const dailyData = useContext(DailyDataContext);
  const isLoading = props.isLoading;
  const country = selectedCountry === 'Global' ? 'Global cases' : selectedCountry;
  // this is done to adjust the headings bw global and other countries
  const type = isLoading ? 'Loading' : props.type;
  // this is done to introduce loading image
  switch ((type === 'Line') ? (selectedCountry !== 'Global' ? 'LineOfOtherThanGlobal' : 'Line') : type) {
    // this is done so that when we change to other country from global having linegraph it adjusts to bargraph
    case 'LineOfOtherThanGlobal':
      props.setType('Bar');
      return <div></div>
    // needed to return something from Graph.js

    case 'Loading':
      return <div >
        <h1>Loading...</h1>
        <img style={{ width: '50%', height: 'auto' }} src='/covidLoader.png' alt='loading' />;
        </div>

    case 'Bar':
      return <BarGraph title='Bar' country={country} labels={Object.keys({ ...globalData?.Global })} data={Object.values({ ...globalData?.[selectedCountry] })}></BarGraph>

    case 'Line':

      return <LineGraph title='Line' country={country} labels={dailyData.map((data) => data.reportDate)} data={dailyData.map((data) => data.Confirmed)}></LineGraph>

    case 'Doughnut':
      return <DoughnutGraph title='Doughnut' country={country} labels={Object.keys({ ...globalData?.Global })} data={Object.values({ ...globalData?.[selectedCountry] })}></DoughnutGraph>

    case 'Pie':
      return <PieGraph title='Pie' country={country} labels={Object.keys({ ...globalData?.Global })} data={Object.values({ ...globalData?.[selectedCountry] })}></PieGraph>

    case 'Polar':
      return <PolarGraph title='Polar' country={country} labels={Object.keys({ ...globalData?.Global })} data={Object.values({ ...globalData?.[selectedCountry] })}></PolarGraph>

    default:
        return <div>failed</div>
  }


}










