import React from 'react';
import './converter.scss';

export default class App extends React.Component {  

  /* Updates the value in the converted box when user types in the value in the input box */
  changeResult(type) {
  	let e = document.getElementById("result-option");
  	let current = document.getElementById("initial-input").value;
	let strUser = e.options[e.selectedIndex].value;
	let multiplier = parseFloat(type[strUser]);
	if(current) {
  		document.getElementById('final-result').value = parseFloat(current) * multiplier;  	
  	} else {
  		document.getElementById('final-result').value = "0.00";  	
  	}
  } 

  /* Validates the input for Numbers only */
  validateInput(evt) {  	
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]|\./;
	  if( !regex.test(key) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
  }

  /* This method takes care of updating the final currency user wants from the second select menu */
  changeCurrency(event,values) {
  	let current = document.getElementById("initial-input").value;  	
	let multiplier = parseFloat(values[event.target.value]);
	if(current) {
  		document.getElementById('final-result').value = parseFloat(current) * multiplier;  	
  	} else {
  		document.getElementById('final-result').value = "0.00";  	
  	}
  }

  /* Fetnches the new base currency data when user selects the currency from the first select option */
  fetchData(e) {
  	var url = "http://api.fixer.io/latest?base=" + e.target.value;  	
    this.props.loadCurrencyFromServer(url);
    document.getElementById('final-result').value = "0.00";
    document.getElementById('initial-input').value = "0.00";
  }  

  /* Renders the widget on the page */
  render() {  
  	let type = [];
  	let values = this.props.currency;  	  	
  	let currKey = Object.keys(this.props.currency);	  	
  	if(currKey) {
	    currKey.forEach(function(value) {
	        type.push(<option value={value}>{value}</option>);
	    });        
    }      
    return (      
      <div className='currency-converter-wrapper'>
        <h2>Currency converter</h2>
        <div className='initial-value'>Type in amount and select currency:</div>
        <div><input id="initial-input" type="text" placeholder="0.00" onKeyPress= {this.validateInput} onKeyUp={()=>this.changeResult(values)} /> <select id="base-change" onChange={this.fetchData.bind(this)}><option value="CAD">CAD</option>{type}</select></div>
        <div className='converted'>Converted amount:</div>
        <div><input id="final-result" type="text" placeholder="0.00" /> <select id="result-option" onChange={(event)=>this.changeCurrency(event,values)}>{type}</select></div>
        <div className='disclaimer'><a href="#" onClick={this.showDisclaimer}>Disclaimer</a></div>        
      </div>);
  }
}