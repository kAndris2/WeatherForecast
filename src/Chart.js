import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react';

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {	

    //indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle"
    //indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" 

    findStuffInArrayOfObejcts(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    getDataPoints(){
        let weather = this.props.weather.location.values;

        let data = [];
        
        let max_temp = Math.max.apply(Math, weather.map(function(o) { return o.temp; }));
        let max_temp_idx = this.findStuffInArrayOfObejcts(weather,"temp",max_temp);

        let min_temp = Math.min.apply(Math, weather.map(function(e) { return e.temp; }));
        let min_temp_idx = this.findStuffInArrayOfObejcts(weather,"temp",min_temp);

        console.log(max_temp);
        console.log(min_temp_idx);

        for (let index = 0; index < weather.length; index++) {
            if (weather[index].temp != null){
                if (index === max_temp_idx){
                    data.push({x: new Date(weather[index].datetimeStr),indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" , markerSize: 12, y: weather[index].temp})
                }
                else if (index === min_temp_idx){
                    data.push({x: new Date(weather[index].datetimeStr),indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" , markerSize: 12, y: weather[index].temp})
                }
                else{
                    data.push({x: new Date(weather[index].datetimeStr), y: weather[index].temp})
                }
            }
        }
        return data;
    }

    getAverageData(){
        const weather = this.getDataPoints();

        

        const average = weather.reduce((total, next) => total + next.y, 0) / weather.length;
        return average;
    }

	render() {
        let dp = this.getDataPoints();
        let avg = this.getAverageData();
        console.log(avg)
        const options = {
            animationEnabled: true,
            theme: "light2",
			title:{
				text: "Weather Temperature Forecast"
			},
			axisX: {
                includeZero: false,
                crosshair: {
                    enabled: true
                },
				valueFormatString: "DDD HH"
			},
			axisY: {
                includeZero: false,
                crosshair: {
                    enabled: true
                },
                stripLines: [{
                    value: avg,
                    color: "red",
                    labelFontColor: "red",
                    label: "Average"
                }],
				title: "Temperature",
				prefix: "°C "
            },
            
			data: [{
                indexLabelFontSize: 16,
				yValueFormatString: "##.# °C",
				xValueFormatString: "HH:mm",
                type: "spline",
				dataPoints: dp	
			}]
        }
        
		return (
            <div>
                <CanvasJSChart options = {options}
                />
            </div>
        );
	}
}
 
export default Chart;   