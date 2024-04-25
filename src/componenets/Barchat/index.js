import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import BargraphObj from "../utils";

export default class Stuckbargraph extends React.Component {
    render(){
        return(
            <HighchartsReact
             highcharts={Highcharts}
             options={BargraphObj}
            />
        )
    }
}