import React,{Component} from 'react';
import './App.css';

class App extends Component {

    constructor(props){
      super(props);
      this.state={
        currencies:{},
        convertedValue:"0"
      }

      this.amount=null;
      this.from=null;
      this.to=null;

    }


  fetchAllCurrencies(){
    fetch("https://free.currconv.com/api/v7/currencies?apiKey=fa020b83e42480a55f41")
    .then(response=>response.json())
    .then(data=>{
        this.setState({currencies:data.results});
        
    })
    .catch((err)=>{
        console.log(err);
    })
} 


 convert(){
  
  if(this.amount!==null && this.from!==null && this.to!==null){
      
  fetch(`https://free.currconv.com/api/v7/convert?apiKey=fa020b83e42480a55f41&q=${this.from}_${this.to}&compact=y`)
 .then(response=>response.json())
 .then(data=>{
      
      let money=this.amount*data[`${this.from}_${this.to}`].val;
      this.setState({convertedValue:money.toFixed(2)+` ${this.to}`});
      

 })
 .catch((err)=>{
     console.log(err);
 })

  }
  else{
    this.setState({convertedValue:"Fill All The Fields"});
  }

}


  componentDidMount(){

    this.fetchAllCurrencies();

  }



  render(){
    return (
      <div className="app">
      <div className="main">

      <div className="main_content">

          <h1>Currency Converter</h1>

          <div className="inputs">
                  <input type="number" placeholder="Amount" id="amount" onChange={(event)=>{this.amount=event.target.value}}/>
                  <select id="from" onChange={(event)=>{this.from=event.target.value}}>
                  <option value="">From</option>
                    {
                      Object.keys(this.state.currencies).map((item,index)=>(
                        <option value={item} key={index}>{item}</option>
                      ))
                    }
                      
                  </select>
                  <select id="to" onChange={(event)=>{this.to=event.target.value}}>
                  <option value="">To</option>
                    {
                      Object.keys(this.state.currencies).map((item,index)=>(
                        <option value={item} key={index}>{item}</option>
                      ))
                    }
                  </select>
                  <button onClick={()=>{this.convert()}}>Convert</button>
          </div>

          <div className="value" id="value">
                  {this.state.convertedValue}
          </div>

      </div>

  </div>
  </div>

  );
  }
}

export default App;
