chrome.runtime.onInstalled.addListener(function() {
  chrome.history.search({
    text: "",
    maxResults: "10000"
  }, function(array of HistoryItem items){
      chrome.storage.sync.set({history: items});
      var myBias = setMyBias(items);
      setBias(myBias, items);
      setFreq(items);
    })
  }
);

chrome.tabs.onUpdated.addListener(function(integer tabID, object changeInfo, Tab tab) {
  chrome.storage.sync.get('site_bias_map', function(bias) {
    if(bias.contains(changeInfo.url)){
      chrome.storage.sync.get('site_freq_map', function(freq){
        freq[bias] += 1;
      }
      alert("Bad Site");
    }
  })
});

function setBias(){

}

function setFreq(){

}
