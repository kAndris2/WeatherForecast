import React, {Component} from 'react';
import List from './List';
import Pagination from "react-js-pagination";
import Chart from './Chart';

    class App extends Component {
      state = {
        loaded: false,
        city: "Eger",
        weather: [],
        headers: ['Dátum','Kedd','Szerda','Csütörtök','Péntek','Szombat','Vasárnap'],
        activePage: 1,
        newData: [],
        offset: 0,
        perPage: 10
      }

      getData(city){
        let url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?'+
        'aggregateHours=1&'+
        'combinationMethod=aggregate&'+
        'contentType=json&'+
        'unitGroup=metric&'+
        'locationMode=single&'+
        'key=VGI4KGKVXS1W2461TTPDAZ1CK&'+ //VGI4KGKVXS1W2461TTPDAZ1CK || X1T4HSVB1SFR2JDVHVUML7T5S
        'locations='+city+'%20';
        fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ weather: data , loaded: true});
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

      componentDidMount() {
        this.getData(this.state.city);
      }

      handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});   
      }

      render () {
        if(!this.state.loaded || !this.state.newData[0]){
          return(
            <div>
                tőt...
            </div>
          );
        }
        
        return (
          <div className="container">
            <List 
              weather={this.state.newData[this.state.activePage - 1]} 
              location={this.state.weather.location.address}
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
            
            <Chart></Chart>
          </div>
        );
        
      }
    }

export default App;