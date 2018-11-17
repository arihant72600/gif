import React from 'react';

import ReactDOM from 'react-dom';
console.log("gif Summarizer active");

let api_key = 'ETf2pwrpJCGOOnNiEXyRVcrQcZ8NS7a6';

var listen = chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    console.log(request);
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting == "hello")
      sendResponse({ farewell: "goodbye" });
    if (request.greeting == "phrases") {
      sendResponse({ farewell: "gotPhrases" });
      let r = window.getSelection().getRangeAt(0);
      let x = r.cloneContents();
      r.deleteContents();
      r.insertNode(x);
      console.log(r.cloneContents());
      request.keyphrases.forEach(element => {
        fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + api_key + '&s=' + element, {
          method: 'GET'
        }).then(
          (value) => value.json().then(
            (data) => gifApp.insertApp(element, data.embed_url)));
        console.log(element + "hi");
      });
    }
  });


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: []
    }
  }
  render() {

    return (
      <div id="chrome-extension">"Gifs:"
      {this.state.gifs.map((ge) => <GifElement phrase={ge.phrase} url={ge.url} />)}
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
    this.state = {
      phrase: props.phrase,
      url: props.url
    }
    return (

      <div>

        {this.state.props}
        <img src={this.state.url} />
      </div>

    )
  }
}



const newDiv = document.createElement("div");

newDiv.setAttribute("id", "chromeExtensionReactApp");

document.body.appendChild(newDiv);

let gifApp = ReactDOM.render(<App />, newDiv);
console.log("rendered");
