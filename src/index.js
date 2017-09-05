import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/converter.jsx';

/* This is the main React Class/Component */
/* Fetches the currency data for the inital load and pass the props to the App Component for rendering the widget */
var Currencyload = React.createClass({

    loadCurrencyFromServer: function (url) {
        fetch(url).then(function(response) {
        	return response.json();
        }).then(function(responseJson) {        	
            this.setState({currency: responseJson.rates});            
        }.bind(this));
    },

    getInitialState: function () {
        return {currency: []};
    },

    componentDidMount: function () {
        this.loadCurrencyFromServer("http://api.fixer.io/latest?base=CAD");
    },

    render: function() {
        return ( 
        	<App currency={this.state.currency} 
        	 loadCurrencyFromServer={this.loadCurrencyFromServer}/> 
        );
    }
});

ReactDOM.render(<Currencyload />, document.getElementById('root'));