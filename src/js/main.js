import React from "react";

import ReactDOM from "react-dom";

let api_key = "QT3UfwWkbHCq4nT6gr8NSRWhS4gXWmyA";

const matchText = function(node, regex, callback) {
  console.log(node);
  var excludeElements = ["script", "style", "iframe", "canvas"];
  if (node === null) return;
  if (node.nodeType === 3) var child = node;
  else var child = node.firstChild;

  while (child) {
    console.log(child);
    switch (child.nodeType) {
      case 1:
        console.log(child);
        if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
          break;
        }
        console.log("setting timeout");
        console.log(child);
        ((c, r, ca) =>
          setTimeout(() => {
            console.log("calling setTimeOut");
            console.log(c);
            matchText(c, r, ca);
          }, 0))(child, regex, callback);
        break;
      case 3:
        console.log(child.data);
        var bk = 0;
        child.data.replace(regex, function(all) {
          var args = [].slice.call(arguments),
            offset = args[args.length - 2],
            newTextNode = child.splitText(offset + bk),
            tag;
          bk -= child.data.length + all.length;

          newTextNode.data = newTextNode.data.substr(all.length);
          tag = callback.apply(window, [child].concat(args));
          child.parentNode.insertBefore(tag, newTextNode);
          child = newTextNode;
        });
        regex.lastIndex = 0;
        break;
    }
    child = child.nextSibling;
  }

  return node;
};

const matchPhrase = (ancestor, searchTerm, url) => {
  console.log(searchTerm);
  console.log(ancestor);
  setTimeout(
    () =>
      matchText(
        ancestor,
        new RegExp("\\b" + searchTerm + "\\b", "g"),
        (node, match, offset) => {
          var span = document.createElement("span");
          span.id = "gifSummary";
          span.textContent = match;
          setTimeout(() => {
            console.log(span);
            ReactDOM.render(<GifElement phrase={searchTerm} url={url} />, span);
          }, 0);
          return span;
        }
      ),
    0
  );
};

class GifElement extends React.Component {
  render() {
    return (
      <div>
        {this.props.phrase}
        <iframe
          src={this.props.url}
          width="480"
          height="200"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
      </div>
    );
  }
}

var listen = chrome.runtime.onMessage.addListener(function(
  request,
  sender,
  sendResponse
) {
  sendResponse({ farewell: "gotPhrases" });
  let r = window.getSelection().getRangeAt(0);
  let commonAncestor = r.commonAncestorContainer;

  request.keyphrases.forEach(element => {
    console.log("fetching");
    fetch(
      "https://api.giphy.com/v1/gifs/translate?api_key=" +
        api_key +
        "&s=" +
        element,
      { method: "GET" }
    ).then(value =>
      value.json().then(data => {
        console.log("calling matchPhrase on" + data);
        matchPhrase(commonAncestor, element, data.data.embed_url);
        console.log("finished calling matchPhrase");
      })
    );
  });
});
