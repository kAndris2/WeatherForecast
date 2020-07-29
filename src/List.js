import React from 'react';
import moment from 'moment';
//import './Weather.css';

const Table = ({ weather,location,data }) => {
    console.log(data);


    function setWeatherIcon(icon) {
        if (icon.length == 1 && icon[0] == "clear") {
            return (
                <img src="sunny.jpg" width="100" height="100" />
            );
        }
        else if (icon.length == 1 && icon[0] == "overcast") {
            return (
                <img src="cloudy.jpg" width="100" height="100" />
            );
        }
        else if (icon.length == 1 && icon[0] == "partially cloudy") {
            return (
                <img src="sun-shower.jpg" width="100" height="100" />
            );
        }
        else if (icon.length == 1 && icon[0] == "rain" || icon.length > 1 && icon.includes("rain")) {
            return (
                <img src="rainy.jpg" width="100" height="100"/>
            );
        }
    }

    return ( 
        // <table id="tablePreview" classNameName="table table-hover table-striped">
        //     <thead>
        //         <tr>
        //             {headers.map(header => 
        //                <th>{header}</th>  
        //             )}
        //         </tr>
        //     </thead>
        //     <tbody>        
        //         {weather.location.values.map(hour => 
        //             <tr> 
        //                 <td>{moment(hour.datetimeStr).format("YYYY.MM.DD H:mm")}</td>
        //                 <td></td>
        //             </tr>
        //         )}
        //     </tbody>
        // </table>
        <table className="table table-hover">
            <tbody>
                <h1>{location}</h1>

                <div class="container row">

                    <div class="col-auto">
                        <img src="sunrise.jpg" width="50" height="50" />
                        {moment(data.location.currentConditions.sunrise).format("h:mm")}
                    </div>

                    <div class="col">
                        <img src="sunset.jpg" width="50" height="50" />
                        {moment(data.location.currentConditions.sunset).format("h:mm")}
                    </div>

                </div>

                <h4>Current conditions: {moment(data.location.currentConditions.datetime).format("YYYY.MM.DD H:mm")}</h4>

                <table>
                    <tr>
                        <td>
                            <div>
                                <img src="temp.jpg" width="30" height="30" />
                                {data.location.currentConditions.temp}
                                °C
                            </div>
                            
                            <div>
                                <img src="wind.jpg" width="30" height="30" />
                                {data.location.currentConditions.wspd}
                                km/h
                            </div>

                            <div>
                                <img src="humidity.jpg" width="30" height="30" />
                                {data.location.currentConditions.humidity}
                            </div>
                        </td>

                        <td>
                            <div>
                                {setWeatherIcon(data.location.currentConditions.icon.split(','))}
                            </div>
                        </td>
                    </tr>
                </table>

                <tr>
                    <td>
                        <div className="card-deck">
                            {
                                weather.map(test =>
                                    
                                    <div className="card">
                                        <div className="card-header text-center">
                                            {moment(test.datetimeStr).format("YYYY.MM.DD H:mm")}
                                        </div>

                                        <div className="">
                                            <img src="temp.jpg" width="30" height="30" />
                                            {test.temp}
                                            °C
                                        </div>

                                        <div className="">
                                            <img src="wind.jpg" width="30" height="30" />
                                            {test.wspd}
                                            km/h
                                        </div>

                                        <div className="">
                                            <img src="humidity.jpg" width="30" height="30" />
                                            {test.humidity}
                                        </div>
                                    </div>   
                                )
                            }
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  };

  export default Table