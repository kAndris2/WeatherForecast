import React from 'react';
import moment from 'moment';
import './Weather.css';

const Table = ({ weather,location }) => {
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
                <tr>
                    <td>
                        <div className="card-deck">
                            {
                                weather.map(test =>
                                    
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <p className="mt-0 mb-0">{location}</p>
                                            {moment(test.datetimeStr).format("YYYY.MM.DD H:mm")}
                                        </div>

                                        <div className="card-body">
                                            {test.temp}
                                        </div>

                                        <div className="card-footer">
                                            {test.wspd}
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