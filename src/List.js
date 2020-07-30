import React from 'react';
import moment from 'moment';
//import './Weather.css';

const Table = ({ weather,location,data }) => {
    


    function setWeatherIcon(icon) {
        if (icon.length === 1 && icon[0].toLowerCase() === "clear") {
            return (
                <img alt="sun" src="sunny.jpg" width="100" height="100" />
            );
        }
        else if (icon.length === 1 && icon[0].toLowerCase() === "overcast") {
            return (
                <img alt="cloud" src="cloudy.jpg" width="100" height="100" />
            );
        }
        else if (icon.length === 1 && icon[0].toLowerCase() === "partially cloudy") {
            return (
                <img alt="partial" src="sun-shower.jpg" width="100" height="100" />
            );
        }
        else if ((icon.length === 1 && icon[0].toLowerCase() === "rain") || (icon.length > 1 && icon.includes("Rain"))) {
            return (
                <img alt="rain" src="rainy.jpg" width="100" height="100"/>
            );
        }
        else {
            return (
                <img alt="no-data" src="no-data.png" width="100" height="100" />
            );
        }
    }

    return ( 
        <>
            <div className="row mb-3">
                <div className="col-sm">
                    <h1 className="text-center" >{location}</h1>
                </div>
            </div>
        
            <div className="row text-center"> 
                <div className="col p-0">
                    <div className="card">
                        <div className="card-header p-0">
                            <div className="row">
                                <div className="col p-0">
                                    <img alt="rise" src="sunrise.jpg" width="50" height="50" />
                                    {moment(data.location.currentConditions.sunrise).format("h:mm")}
                                </div>
                                <div className="col p-0">
                                    <h4>Current conditions: {moment(data.location.currentConditions.datetime).format("YYYY.MM.DD H:mm")}</h4>
                                </div>
                                <div className="col p-0">
                                    <img alt="set" src="sunset.jpg" width="50" height="50" />
                                    {moment(data.location.currentConditions.sunset).format("HH:mm")}
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <p className="mb-0">
                                {/* {setWeatherIcon(data.location.currentConditions.icon.split(','))} */}
                            </p>
                            <p className="card-title">
                                Temperature:
                                <img alt="temp" src="temp.jpg" width="30" height="30" />
                                    {data.location.currentConditions.temp}
                                    °C
                            </p> 
                            <p>
                                Wind speed:<img alt="wind" src="wind.jpg" width="30" height="30" />
                                    {data.location.currentConditions.wspd}
                                    km/h
                            </p>
                            <p>
                                Humidity:<img alt="humidity" src="humidity.jpg" width="30" height="30" />
                                    {data.location.currentConditions.humidity}
                                    %
                            </p>
                        </div>
                    </div>
                </div>
            </div>
       
            <div className="card-deck">
                {
                    weather.map(test =>   
                        <div className="card" key={test.datetime}>
                            <div className="card-header text-center">
                                {moment(test.datetimeStr).format("YYYY.MM.DD H:mm")}
                            </div>

                            <div className="">
                                {setWeatherIcon(test.conditions.split(','))}
                            </div>

                            <div className="">
                                <img alt="temp" src="temp.jpg" width="30" height="30" />
                                {test.temp}
                                °C
                            </div>

                            <div className="">
                                <img alt="wind" src="wind.jpg" width="30" height="30" />
                                {test.wspd}
                                km/h
                            </div>

                            <div className="">
                                <img alt="humidity" src="humidity.jpg" width="30" height="30" />
                                {test.humidity}
                            </div>
                        </div>   
                    )
                }
            </div>
          
        </>
    );
  };

  export default Table