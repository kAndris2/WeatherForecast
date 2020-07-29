import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Chart extends Component {	
	render() {
        const options = {
            title: {
                text: "Temp forecast"
              },
              data: [{				
                        type: "line",
                        dataPoints: [
                            { label: "datum1",  y: 10  },
                            { label: "datum2", y: 15  },
                            { label: "datum3", y: 25  },
                            { label: "datum4",  y: 30  },
                            { label: "datum5",  y: 28  }
                        ]
               }]
        }
		return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef = {ref => this.chart = ref} */
                />
            </div>
        );
	}
}
 
export default Chart;   