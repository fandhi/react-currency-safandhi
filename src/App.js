import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: '',
      isHidden: true,
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

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  handleHide(key) {
  // console.log(index);
   var x = document.getElementById(key);
    x.hidden = "hidden";
  }

  handleAdd() {
    
    var j = document.getElementById('addKey');
    if(typeof j != undefined && j != null) {
      console.log(j.value);

      if(j.value !== "") {
      var k = document.getElementById(j.value);
      k.hidden = "";
      }
    }
  }

  render() {
    // console.log(`Render lifecycle: ${JSON.stringify(this.state)}`)
    console.log(this.state.data)
    // Object.keys(this.state.data).map(key => console.log(key)); 

    return (
      <div className="row mt-2">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">
                <p>USD - United States Dollars</p>
                <span>USD</span>
                <span className="float-right">
                  <input type="number" onChange={this.handleChange.bind(this)} />
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

                          <p className="font-weight-bold"><em>{key} - </em></p>
                          <p className="font-italic">1 USD = {key} {this.state.data[key]}</p>
                        </div>
                        <div className="col-2">
                          <button className="btn btn-danger float-right" type="button" onClick={() => this.handleHide(key)}>-</button>
                        </div>
                      </div>
                    </li>)
                    : (
                    <li id={key} className="list-group-item" hidden>{index}
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

                          <p className="font-weight-bold"><em>{key} - </em></p>
                          <p className="font-italic">1 USD = {key} {this.state.data[key]}</p>
                        </div>
                        <div className="col-2">
                          <button className="btn btn-danger float-right" type="button" onClick={() => this.handleHide(key)}>-</button>
                        </div>
                      </div>
                    </li>)

                )}

              </ul>
              <button className="btn btn-success btn-block">+ Add More Currencies</button>
              <div className="input-group">
                <input id="addKey" className="form-control" type="text" />
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
