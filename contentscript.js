var isEditing = false;

var clickHandler = function(event){
  event.preventDefault();
  isEditing = false;

  event.target.style.display = 'none';

  document.removeEventListener('click',clickHandler);

  chrome.runtime.sendMessage({type: 'icon', isEditing: false}, function(response) {});
}



var createListener = function() {
  // Prevent adding more than one click listener
  if(!isEditing) {
    isEditing = true;

    // Catch clicked element
    document.addEventListener('click',clickHandler);
  }
}

// Waits for a message from the icon when clicked
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.action === 'run'){
    createListener();
  }

  // Send empty response to clean connection
  sendResponse({});
});
