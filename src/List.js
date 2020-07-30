import React from 'react';
import moment from 'moment';
//import './Weather.css';

const Table = ({ weather,location,data }) => {
    


    function setWeatherIcon(icon, mode) {
        if (mode) {
            try {

                icon = data.location.currentConditions.icon.split(',');
            }
            catch (err) {
                icon = [];
            }
        }

        const icons = [];
        icon.forEach(item => {
            if (item === "clear-day") {
                icons.push("clear");
            }
            else {
                icons.push(item.toLowerCase());
            }
        });

        if (icons.length === 1 && icons[0] === "clear") {
            return (
                <img alt="sun" src="sunny.jpg" width="100" height="100" />
            );
        }
        else if (icons.length === 1 && icons[0] === "overcast") {
            return (
                <img alt="cloud" src="cloudy.jpg" width="100" height="100" />
            );
        }
        else if (icons.length === 1 && icons[0] === "partially cloudy") {
            return (
                <img alt="partial" src="partially-cloudy.jpg" width="100" height="100" />
            );
        }
        else if ((icons.length === 1 && icons[0] === "rain") || (icons.length > 1 && icons.includes("Rain"))) {
            return (
                <img alt="rain" src="rainy.jpg" width="100" height="100"/>
            );
        }
        else if (icons.includes("rain") && icons.includes("overcast")) {
            return (
                <img alt="over-rain" src="over-rain.jpg" width="100" height="100" />
            );
        }
        else if (icons.includes("clear") && icons.includes("rain") || icons.includes("rain") && icons.includes("partially cloudy")) {
            return (
                <img alt="sun-shower" src="sun-shower.jpg" width="100" height="100" />
            );
        }

        return (
            <img alt="no-data" src="no-data.png" width="100" height="100" />
        );
    }

    return ( 
        <>
            {/* <div className="row mb-3">
                <div className="col-sm">
                    <h1 className="text-center" >{location}</h1>
                </div>
            </div> */}
        
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
                                {setWeatherIcon([], true)}
                            </p>
                            <p className="card-title">
                                Temperature:
                                <img alt="temp" src="temp.jpg" width="30" height="30" />
                                    {data.location.currentConditions.temp == null ? "N/A" : data.location.currentConditions.temp}
                                    °C
                            </p> 
                            <p>
                                Wind speed:<img alt="wind" src="wind.jpg" width="30" height="30" />
                                    {data.location.currentConditions.wspd == null ? "N/A" : data.location.currentConditions.wspd}
                                    km/h
                            </p>
                            <p>
                                Humidity:<img alt="humidity" src="humidity.jpg" width="30" height="30" />
                                    {data.location.currentConditions.humidity == null ? "N/A" : data.location.currentConditions.humidity}
                                    %
                            </p>
                            <p>
                                Precip:<img alt="precip" src="precip.jpg" width="30" height="30" />
                                    {data.location.currentConditions.precip == null ? "N/A" : data.location.currentConditions.precip}
                                    mm
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
                                {setWeatherIcon(test.conditions.split(', '), false)}
                            </div>

                            <div className="">
                                <img alt="temp" src="temp.jpg" width="30" height="30" />
                                {test.temp == null ? "N/A" : test.temp}
                                °C
                            </div>

                            <div className="">
                                <img alt="wind" src="wind.jpg" width="30" height="30" />
                                {test.wspd == null ? "N/A" : test.wspd}
                                km/h
                            </div>

                            <div className="">
                                <img alt="humidity" src="humidity.jpg" width="30" height="30" />
                                {test.humidity == null ? "N/A" : test.humidity}
                                %
                            </div>

                            <div>
                                <img alt="cor" src="cor.jpg" width="30" height="30" />
                                {test.pop == null ? "N/A" : test.pop}
                                %
                            </div>

                            <div>
                                <img alt="precip" src="precip.jpg" width="30" height="30" />
                                {test.precip == null ? "N/A" : test.precip}
                                mm
                            </div>
                        </div>   
                    )
                }
            </div>
          
        </>
    );
  };

  export default Table