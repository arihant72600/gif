import React from 'react';

import ReactDOM from 'react-dom';
console.log("gif Summarizer active");

let api_key = 'QT3UfwWkbHCq4nT6gr8NSRWhS4gXWmyA';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: []
    }
  }
  render() {
    return (
      <div id="chrome-extension">
        Gifs:
         {this.state.gifs.map((ge, index) =>
          <GifElement key={index} phrase={ge.phrase} url={ge.url} />)}
      </div>
    );
  }

  insertApp(keyphrase, gifUrl) {
    this.setState({
      gifs: [...this.state.gifs, { phrase: keyphrase, url: gifUrl }]
    });
  }
}

class GifElement extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }


  render() {
    return (
      <div>
        {this.props.phrase}
        <iframe src={this.props.url} width="480" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>

    );
  }

}

let newDiv = document.createElement("div");

newDiv.setAttribute("id", "chromeExtensionReactApp");

document.body.appendChild(newDiv);

let gifApp = ReactDOM.render(<App />, newDiv);


var listen = chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    sendResponse({ farewell: "gotPhrases" });
    let r = window.getSelection().getRangeAt(0);
    let x = r.cloneContents();
    r.deleteContents();
    r.insertNode(x);
    request.keyphrases.forEach(element => {
      console.log("fetching");
      fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + api_key + '&s=' + element,
        { method: 'GET' }
      ).then(
        (value) => value.json().then(
          (data) => gifApp.insertApp(element, data.data.embed_url)
        )
      );
    });
  });