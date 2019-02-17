chrome.runtime.onInstalled.addListener(()=> {
  chrome.history.search({
    text: "",
    maxResults: 110
  }, (items) => {
    console.log(items);
    console.log("hoi");
    setFreq(items);
    setBias(items);
  })

  chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
    chrome.storage.sync.get('freq', function(data){
      if(changeInfo.url in data.freq){
        data.freq[changeInfo.url] += 1;
        chrome.storage.sync.set({'title': tab.title}, function(){
          console.log("Set title")
        })
      }
      updateBiasScore(data.freq);
    })
    chrome.storage.sync.get('bias', function(bias){
      if(bias[changeInfo.url] > 40 || bias[changeInfo.url] < -40){
        alert("Unreliable News Source!");
      }
    })
  });

  function setBias(items){
    var jsonObjectOfItems = {"test":0};
      var re = new RegExp('^http(s)?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*?(:[0-9]+)?(\/)?$/i');
      items.forEach(async function(item) { {
        var pathArray = item.url.split( '/' );
        var protocol = pathArray[0];
        var host = pathArray[2];
        host = host.replace("www.", "")
        console.log({
          "url": host
        });
        (async () => {
          const rawResponse = await fetch('https://nodeapitreehacks2019.herokuapp.com/url', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"url": host})
          });
          var content = await rawResponse.json()
          content = content[0];
          if(!isEmpty(content)) {
            var bias;
            if(content.bias = 'left'){
              jsonObjectOfItems[content.url] = -30
            }
            else if(content.bias = 'leftcenter'){
              jsonObjectOfItems[content.url] = -15

            }
            else if(content.bias == 'center'){
              jsonObjectOfItems[content.url] = 0

            }
            else if(content.bias == 'right-center'){
              jsonObjectOfItems[content.url] = 15

            }
            else if(content.bias == 'right'){
              jsonObjectOfItems[content.url] = 30
            }
            else{
              jsonObjectOfItems[content.url] = 50
            }
          }

        })();
        // await fetch("https://nodeapitreehacks2019.herokuapp.com/url", {
        //   method: "POST", // *GET, POST, PUT, DELETE, etc.
        //   mode: "no-cors", // no-cors, cors, *same-origin
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   },
        //   body: {
        //     "url": host
        //   }
        // }).then(function(response) {
        //   console.log(response.body);
        // })
        // if(!isEmpty(baisObject)) {
        //   if(!jsonObjectOfItems.hasOwnProperty(baisObject)) jsonObjectOfItems[baisObject] = 0;
        //   jsonObjectOfItems[baisObject] += 1;
        // }
      }
      console.log(jsonObjectOfItems);
    })
    chrome.storage.sync.set({"bias": jsonObjectOfItems});
  }

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
      return false;
    }
    return true;
  }

  async function setFreq(items){
    var jsonObjectOfItems = new Map();
    var re = new RegExp('^http(s)?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*?(:[0-9]+)?(\/)?$/i');
    items.forEach(async function(item) { {
      var pathArray = item.url.split( '/' );
      var protocol = pathArray[0];
      var host = pathArray[2];
      host = host.replace("www.", "")
      console.log({
        "url": host
      });
      (async () => {
        const rawResponse = await fetch('https://nodeapitreehacks2019.herokuapp.com/url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"url": host})
        });
        var content = await rawResponse.json()
        content = content[0];
        if(!isEmpty(content)) {
          if(jsonObjectOfItems.hasOwnProperty(content.url)) jsonObjectOfItems[content.url] += 1;
          else jsonObjectOfItems[content.url] = 1;
        }

      })();
      // await fetch("https://nodeapitreehacks2019.herokuapp.com/url", {
      //   method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   mode: "no-cors", // no-cors, cors, *same-origin
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: {
      //     "url": host
      //   }
      // }).then(function(response) {
      //   console.log(response.body);
      // })
      // if(!isEmpty(baisObject)) {
      //   if(!jsonObjectOfItems.hasOwnProperty(baisObject)) jsonObjectOfItems[baisObject] = 0;
      //   jsonObjectOfItems[baisObject] += 1;
      // }
    }
    console.log(jsonObjectOfItems);
    chrome.storage.sync.set({"freq": jsonObjectOfItems});
    updateBiasScore(jsonObjectOfItems);
  }) }

  function updateBiasScore(freq){
    var numSites = 0;
    var totalBias = 0;
    for(const item of freq.keys()){
      numSites += freq[item];
      chrome.storage.sync.get('bias', function(data){
        totalBias += data.bias[item] * freq[item];
      })
    }
    chrome.storage.sync.set({bias: totalBias/numSites}, function() {
      console.log("New bias");
    });
  }
})
