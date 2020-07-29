import React, {Component} from 'react';
import List from './List';
import Pagination from "react-js-pagination";
import Chart from './Chart';

    class App extends Component {
      constructor(props){
        super(props);
        this.state = {
          loaded: false,
          city: "Eger",
          weather: [],
          activePage: 1,
          newData: [],
          offset: 0,
          perPage: 7,
          value:''
        };
        this.addValue = this.addValue.bind(this);
        this.updateInput = this.updateInput.bind(this);
      }
      // state = {
        
      // }

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

      addValue(evt){
        evt.preventDefault();
        if (this.state.value !=undefined){
          let new_city = this.state.value;
          this.getData(new_city);
        }
      }
    
      updateInput(evt){
        this.state={value: evt.target.value};   
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
            <div className="container text-center align-middle">
              <video playsInline="" muted="" autoPlay={true} loop={true} data-silent="true" src="https://cdn.dribbble.com/users/107759/screenshots/2436386/copper-loader.gif?vid=1"></video>
              <div className="h1">Tőtök</div>
            </div>
          );
        }
        
        return (
          <>
            <div className="container">
            <form onSubmit={this.addValue}>
              <input type="text" onChange={this.updateInput} /><br/><br/>
              <input type="submit" value="submit"/>
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
            <div className="container-fluid">
              <Chart weather={this.state.weather}></Chart>
            </div>
          </>
        );
        
      }
    }

export default App;