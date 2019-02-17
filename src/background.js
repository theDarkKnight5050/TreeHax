chrome.runtime.onInstalled.addListener(()=> {
  chrome.history.search({
    text: "",
    maxResults: 110
    }, (items) => {
      // console.log(items);
      setFreq(items);
      setBias();
    })

  chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
      chrome.storage.sync.get('site_freq_map', function(freq){
        freq[changeInfo.url] += 1;
        updateBias();
      })
      chrome.storage.sync.get('site_bias_map', function(bias){
        if(bias[changeInfo.url] > 40 || bias[changeInfo.url] < -40){
          alert("Bad Site");
        }
      })
  });

  function setBias(myBias, items){
    // console.log(items);
  }

  function setFreq(items){
    // console.log(items);
    var freq;
    updateBiasScore(freq);
  }

  function updateBiasScore(freq){

  }
})
