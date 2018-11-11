chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    console.log(request);
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting == "hello")
      sendResponse({ farewell: "goodbye" });
  });


import React from 'react';

import ReactDOM from 'react-dom';



class App extends React.Component {

  render() {

    return (

      <div> Your App injected to DOM correctly! </div>

    )

  }

}



// Message Listener function





function injectApp() {

  const newDiv = document.createElement("div");

  newDiv.setAttribute("id", "chromeExtensionReactApp");

  document.body.appendChild(newDiv);

  ReactDOM.render(<App />, newDiv);

}