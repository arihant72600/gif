import React from 'react';

import ReactDOM from 'react-dom';
var API_KEY = process.env.API_KEY;
API_KEY = "77c213a53ef44cab9b0a5bd42ed3faeb";
function generateGifs(info, tab) {
  var x =  fetch('https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', {
  method: 'POST',
  headers: {
    'Ocp-Apim-Subscription-Key': '77c213a53ef44cab9b0a5bd42ed3faeb',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "documents": [
      {
        "id": "1",
        "text": info.selectionText
      }
    ]
  })
}).then(function(value){  value.json().then(function(data) {
    console.log(data.documents[0].keyPhrases);

})});
}

var id = chrome.contextMenus.create({"title":"Generate gifs", "contexts":["selection"], "onclick":generateGifs});
class App extends React.Component {

    render() {
  
      return (
  
        <div> Your App injected to DOM correctly! </div>
  
      )
  
    }
  
  }





