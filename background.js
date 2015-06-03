var changeIcon = function(editing) {
  var icon;

  if(editing){
    icon = chrome.extension.getURL('/img/icon_38_editing.png');
  } else {
    icon = chrome.extension.getURL('/img/icon_38.png');
    chrome.notifications.clear("layer-killer", function(){});
  }

  // Set the extension icon
  chrome.browserAction.setIcon({
      path: icon
  });
};

var showNotification = function() {
  var options = {
    type: "basic",
    title: "Layer Killer",
    message: "Click on the element that you want to hide.",
    iconUrl: "/img/icon_38.png"
  }

  chrome.notifications.create("layer-killer", options);
};

// Icon click listener
chrome.browserAction.onClicked.addListener(function(tab) {
  var message = {
    action: 'run'
  };

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {});
  });

  changeIcon(true);
  showNotification();
});

// Tab change listener
chrome.tabs.onActivated.addListener( function(info) {
  changeIcon(false);
});

// Message handler
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.type){
    case 'icon':
      changeIcon(request.isEditing);
      break;

    default:
      console.log("Unknown request:", request);
  }
});