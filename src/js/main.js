import React from 'react';

import ReactDOM from 'react-dom';
console.log("gif Summarizer active");

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
      let r = new Range();
      r.setStart(window.getSelection().anchorNode, 0);
      if (window.getSelection().focusNode.nodeValue == null)
        r.setEnd(window.getSelection().focusNode, 0);
      else
        r.setEnd(window.getSelection().focusNode, window.getSelection().focusNode.nodeValue.length);
      console.log(r.cloneContents());
    }
  });


class App extends React.Component {

  render() {

    return (

      <div> Your App injected to DOM correctly! </div>

    )

  }

}








function injectApp() {

  const newDiv = document.createElement("div");

  newDiv.setAttribute("id", "chromeExtensionReactApp");

  document.body.appendChild(newDiv);

  ReactDOM.render(<App />, newDiv);

}

