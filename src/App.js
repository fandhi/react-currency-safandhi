import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: '10000',
      isHidden: true,
      shown: true,
    };
  }

  i = 1;

  keys = [];
  componentDidMount() {
    const urlFetch = fetch('https://api.exchangeratesapi.io/latest?base=USD')
    urlFetch.then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resJson => {
      this.setState({
        data: resJson.rates
      })
    })
    
  }
  //input data number currency
  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };
  
  //hide data currency
  handleRemove(key) {
  // console.log(index);
   var x = document.getElementById(key);
    x.hidden = "hidden";
  }

  //show input add currency
  handleShow() {
    this.setState({
      shown: !this.state.shown
    })
  }

  //add currency function
  handleAdd() {
    var j = document.getElementById('addKey');
    var l = document.getElementById('inputDiv');
    var m = document.getElementById('buttonAdd');
    if(typeof j != undefined && j != null) {
      console.log(j.value);
      
      if(j.value !== "") {
        var k = document.getElementById(j.value);
        k.hidden = "";
      }
    }
    l.hidden = "hidden"
    m.hidden = ""
  }

  render() {
    // console.log(`Render lifecycle: ${JSON.stringify(this.state)}`)
    // console.log(this.state.data)
    // Object.keys(this.state.data).map(key => console.log(key)); 
    var shown = {
      hidden: this.state.shown ? "" : "hidden"
    };
    var hide = {
      hidden: this.state.shown ? "hidden" : ""
    };

    return (
      <div className="row mt-2 mb-3">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">
                <p>USD - United States Dollars</p>
                <span>USD</span>
                <span className="float-right">
                  <input type="number" onChange={this.handleChange.bind(this)} value="10000" />
                </span>
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group mb-2">

                {Object.keys(this.state.data).map(
                  // key => <div>{key} {this.state.data[key]}</div>
                  (key,index) => 
                  index < 5 ? (
                    <li id={key} className="list-group-item">
                    <div className="row">
                        <div className="col-10">
                          <div className="row">
                            <div className="col-7">
                              <h5>{key}</h5>
                            </div>
                            <div className="col-5">
                              <span className="float-right">{this.state.data[key] * this.state.value}</span>
                            </div>
                          </div>

                          <p className="font-weight-bold"><em>{key} - No Currency name on API</em></p>
                          <p className="font-italic">1 USD = {key} {this.state.data[key]}</p>
                        </div>
                        <div className="col-2">
                          <button className="btn btn-danger float-right" type="button" onClick={() => this.handleRemove(key)}>-</button>
                        </div>
                      </div>
                    </li>)
                    : (
                    <li id={key} className="list-group-item" hidden>
                      <div className="row">
                        <div className="col-10">
                          <div className="row">
                            <div className="col-7">
                              <h5>{key}</h5>
                            </div>
                            <div className="col-5">
                              <span className="float-right">{this.state.data[key] * this.state.value}</span>
                            </div>
                          </div>

                          <p className="font-weight-bold"><em>{key} - No Currency name on API</em></p>
                          <p className="font-italic">1 USD = {key} {this.state.data[key]}</p>
                        </div>
                        <div className="col-2">
                          <button className="btn btn-danger float-right" type="button" onClick={() => this.handleRemove(key)}>-</button>
                        </div>
                      </div>
                    </li>)

                )}

              </ul>
              <button id="buttonAdd" className="btn btn-success btn-block" onClick={this.handleShow.bind(this)} {...shown}>+ Add More Currencies</button>
              <br></br>
              <div id="inputDiv" className="input-group" {...hide}>
                <input id="addKey" className="form-control" type="text" placeholder="value must in UPPERCASE letter"/>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" onClick={() => this.handleAdd()}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
