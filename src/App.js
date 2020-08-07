import React, {Component} from 'react';
import List from './List';
import Pagination from "react-js-pagination";
import Chart from './Chart';
import Map from './Map';

    class App extends Component {
      constructor(props){
        super(props);
        this.state = {
          loaded: false,
          city: "Eger",
          weather: [],
          activePage: 1,
          newData: [],
          perPage: 7,
          value:'',
          //test:this.getStartCity(),
          v_loaded: false,
          coords: [],
          got_coords: false,
          badCity: ""
        };
        this.addValue = this.addValue.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.getStartPos = this.getStartPos.bind(this);
        this.getCoords = this.getCoords.bind(this);
        //this.state.city = this.getStartCity();
        
      }

      getStartPos(){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCoords) 
        } else { 
          console.log("nah")
        }
      }

      getCoords(position){
        this.state.coords.push(position.coords.latitude);
        this.state.coords.push(position.coords.longitude);
        this.setState({got_coords:true});
      }

      getStartCity(){
        
        const test = this.state.coords;
        let lat = test[0];
        let lon = test[1];
        let url = "http://api.geonames.org/extendedFindNearbyJSON?lat="+lat+"&lng="+lon+"&username=kode";
        fetch(url)
        .then(result => result.json())
        .then((data) => {
          console.log(data);
        })
      }

      getData(city){
        let url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?'+
        'aggregateHours=1&'+
        'combinationMethod=aggregate&'+
        'contentType=json&'+
        'unitGroup=metric&'+
        'locationMode=single&'+
        'key=X1T4HSVB1SFR2JDVHVUML7T5S&' + //VGI4KGKVXS1W2461TTPDAZ1CK& //VGI4KGKVXS1W2461TTPDAZ1CK || W7I3NYLYSXA2JVB4I7ZZ8UJ41
        'locations='+city+'%20';
        fetch(url)
        .then(res => res.json())
        .then((data) => {
          if (city === "kutya" || data.errorCode === 999) {
            this.setState({badCity: city, loaded: false, v_loaded : true})
          }
          else {
          this.setState({ weather: data , loaded: true, v_loaded:false})
          this.paginate();
          }
        })
        .catch()
      }

      paginate(){
        const arr = this.state.weather.location.values;
        this.setState({newData:[]});
        for (let index = 0; index < arr.length; index += this.state.perPage) 
        {
          this.state.newData.push(arr.slice(index, index + this.state.perPage))
        }
    
        this.handlePageChange(1);
      }

      addValue(evt){
        evt.preventDefault();
        if (this.state.value !== undefined){
          let new_city = this.state.value;
          this.setState({loaded:false, v_loaded:true})
          this.getData(new_city);
        }
      }
    
      updateInput(evt){
        this.setState({value: evt.target.value});//, v_loaded:false});   
        
      }

      componentDidMount() {
        this.getData(this.state.city);
        this.getStartPos();
      }

      handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});   
      }

      render () {
        if (this.state.got_coords){
          this.getStartCity();
          
        }
        
        if (!this.state.loaded && this.state.v_loaded && this.state.badCity.length >= 1) {
          return (
            <>
              {this.state.badCity.toLowerCase() === "kutya" ? <h1>Here is the dog!</h1> : <h1>"{this.state.badCity}" is not found!</h1>}
              {this.state.badCity.toLowerCase() === "kutya" ? <img src="dog.gif" /> : <img src="wtf.jpg" />}
            </>
          );
        }
        else if(!this.state.loaded && this.state.v_loaded || !this.state.newData[0]) {
          return(
            <div className="container text-center align-middle">
              <video playsInline="" muted="" autoPlay={true} loop={true} data-silent="true" src="https://cdn.dribbble.com/users/107759/screenshots/2436386/copper-loader.gif?vid=1"></video>
              <div className="h1">Tőtök</div>
            </div>
          );
        }
        
        return (
          <>
            <div className="container-fluid">
              <div className="row">
                  <div className="col-sm-8">
                    <form className="form-inline" onSubmit={this.addValue}>
                      <div className="form-group">
                        <input className="form-control" placeholder="Enter a city" type="text" onChange={this.updateInput} />
                        <input className="btn btn-primary" type="submit" value="submit"/>
                      </div>
                      <div className="form-group mx-sm-3 mb-2">
                        <h2 className="text-center" >{this.state.weather.location.address}</h2>
                      </div>
                    </form>
                      <List 
                        weather={this.state.newData[this.state.activePage - 1]} 
                        location={this.state.weather.location.address}
                        data={this.state.weather}
                        perPage={this.state.perPage}
                        activePage={this.state.activePage}
                      />
                      <Pagination 
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.perPage}
                        totalItemsCount={this.state.weather.location.values.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                      />  
                  </div>
                  <div className="col-sm-4">
                    <Map pos={[this.state.weather.location.latitude,this.state.weather.location.longitude]} city={this.state.weather.location.address.split(",")[0]}></Map>
                  </div>
              </div>
              
            
              
              
            </div>
            <div className="container-fluid">
              <Chart weather={this.state.weather}></Chart>
              
            </div>

            <br/>
            <h5>Meaning of icons:</h5>
            <table>
              <tbody>
              <tr>
                <td>Temperature: <img alt="temp" src="temp.jpg" width="30" height="30" /></td>
                <td>Humidity: <img alt="humidity" src="humidity.jpg" width="30" height="30" /></td>
              </tr>
              <tr>
                <td>Chance of rain: <img alt="cor" src="cor.jpg" width="30" height="30" /></td>
                <td>Precip: <img alt="precip" src="precip.jpg" width="30" height="30" /></td>
              </tr>
              <tr>
                <td>Sunrise: <img alt="sunrise" src="sunrise.jpg" width="30" height="30" /></td>
                <td>Sunset: <img alt="sunset" src="sunset.jpg" width="30" height="30" /></td>
              </tr>
              <tr>
                <td>Wind speed: <img alt="wind" src="wind.jpg" width="30" height="30" /></td>
              </tr>
              </tbody>
            </table>
          </>
        );
        
      }
    }

export default App;