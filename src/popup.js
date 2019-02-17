let setBias = document.getElementById("bias");

chrome.storage.sync.get('bias', function(data){
  setBias.innerHTML = data.bias + "";
});
