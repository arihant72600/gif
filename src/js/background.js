API_KEY = "77c213a53ef44cab9b0a5bd42ed3faeb";
function generateGifs(info, tab) {
  var x = fetch(
    "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases",
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": "77c213a53ef44cab9b0a5bd42ed3faeb",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        documents: [
          {
            id: "1",
            text: info.selectionText
          }
        ]
      })
    }
  ).then(function(value) {
    value.json().then(function(data) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            greeting: "phrases",
            keyphrases: data.documents[0].keyPhrases
          },
          function(response) {}
        );
      });
    });
  });
}

var id = chrome.contextMenus.create({
  title: "Generate gifs",
  contexts: ["selection"],
  onclick: generateGifs
});
