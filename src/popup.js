console.log("Reached popup.js");
let setBias = document.getElementById("bias");
let suggestions = document.getElementById("suggested")

chrome.storage.sync.get('bias', function(data){
  setBias.innerHTML = data.bias + "";
});

suggestions.innerHTML = "Siah Yong I think?"
