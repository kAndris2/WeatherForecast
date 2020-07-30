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
          v_loaded: false
        };
        this.addValue = this.addValue.bind(this);
        this.updateInput = this.updateInput.bind(this);
      }

      getData(city){
        let url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?'+
        'aggregateHours=1&'+
        'combinationMethod=aggregate&'+
        'contentType=json&'+
        'unitGroup=metric&'+
        'locationMode=single&'+
        'key=W7I3NYLYSXA2JVB4I7ZZ8UJ41&'+ //VGI4KGKVXS1W2461TTPDAZ1CK || X1T4HSVB1SFR2JDVHVUML7T5S || W7I3NYLYSXA2JVB4I7ZZ8UJ41
        'locations='+city+'%20';
        fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ weather: data , loaded: true, v_loaded:false});
          this.paginate();
        })
        .catch()
      }

      paginate(){
        const arr = this.state.weather.location.values;

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
          this.getData(new_city);
          this.setState({v_loaded:true})
        }
      }
    
      updateInput(evt){
        this.setState({value: evt.target.value, v_loaded:false});   
        
      }

      componentDidMount() {
        this.getData(this.state.city);
      }

      handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});   
      }

      render () {
        
        if(!this.state.loaded || !this.state.newData[0] || this.state.v_loaded){ //|| this.state.v_loaded
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
                    <Map pos={[this.state.weather.location.latitude,this.state.weather.location.longitude]}></Map>
                  </div>
              </div>
              
            
              
              
            </div>
            <div className="container-fluid">
              <Chart weather={this.state.weather}></Chart>
              
            </div>
          </>
        );
        
      }
    }

export default App;