import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react';

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {	

    findStuffInArrayOfObejcts(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    findMinMax(arr) {
        let min = arr[0].y, max = arr[0].y;
      
        for (let i = 1, len=arr.length; i < len; i++) {
          let v = arr[i].y;
          min = (v < min) ? v : min;
          max = (v > max) ? v : max;
        }
        return [min, max];
    }

    getDataPoints(){
        let weather = this.props.weather.location.values;

        let data = [];        
        //Create a new array without the null values
        for (let i = 0; i < weather.length; i++) {
            if (weather[i].temp != null){
                data.push({x: new Date(weather[i].datetimeStr), y: weather[i].temp})
            } 
        }
        
        let final = []

        // let max_temp = Math.max.apply(Math, data.map(function(o) { return o.y; }));

        //Get max temp and the index of the max temp value from the data array
        let max_temp = this.findMinMax(data)[1];
        let max_temp_idx = this.findStuffInArrayOfObejcts(data,"y",max_temp);
        //Get min temp and the index of the min temp value from the data array
        let min_temp = this.findMinMax(data)[0];
        let min_temp_idx = this.findStuffInArrayOfObejcts(data,"y",min_temp);

        for (let index = 0; index < data.length; index++) {
            if (index === max_temp_idx){
                final.push({x: data[index].x,indexLabel: "\u2191 Highest",indexLabelFontColor: "green",markerColor: "green", markerType: "triangle" , markerSize: 12, y: data[index].y})
            }
            else if (index === min_temp_idx){
                final.push({x: data[index].x,indexLabel: "\u2193 Lowest",indexLabelFontColor: "red",markerColor: "red", markerType: "cross" , markerSize: 12, y: data[index].y})
            }
            else{
                final.push({x: data[index].x, y: data[index].y})
            }
        }
        
        return final;
    }

    getAverageData(){
        const weather = this.getDataPoints();
        const average = weather.reduce((total, next) => total + next.y, 0) / weather.length;
        return average;
    }

	render() {
        let dp = this.getDataPoints();
        let avg = this.getAverageData();
        
        const options = {
            animationEnabled: true,
            theme: "dark",
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