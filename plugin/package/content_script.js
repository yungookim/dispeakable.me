
function injectNewDOM() {
	var originalDOM = $('.newArea');
	var newDOM = $('<span class="enryptedMessage">Bitch</span>');
	
	// Append to html
	originalDOM.parent().append(newDOM);

	// Set up overlay
	newDOM.css("width", originalDOM.width());
	newDOM.css("height", originalDOM.height());
	newDOM.offset(originalDOM.offset());
	newDOM.css("position", "relative");
	newDOM.css("z-index", 100);
}


function hideOriginalMessage() {
	$('.newArea').css("color", $('.newArea').css("backgroundColor"));
}
function resetArea() {
	$('.newArea').removeClass("newArea");
}


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

  	if (request.method == "getSelection"){
  		rangy.init();
			var newAreaApplier = rangy.createCssClassApplier("newArea", true);

  		// First, Inject new Hidden div into selected area
  		var selection = window.getSelection();

  		// newAreaApplier.applyToSelection();

  		// injectNewDOM();
  		// hideOriginalMessage();
    //   sendResponse({data: selection.toString()});
  	} else if(request.method == "encrypt") {
  		var selectionString = window.getSelection().toString();
      return sendResponse(selectionString);
  	} else if (request.method =="updateViewWithEncryptedMessage") {
  		var inputDOM = $(window.getSelection().anchorNode).children()[0];
  		inputDOM.value = request.encryptedMessage;
  	}
    else {
      sendResponse({a:"a"}); // Invalid method
  	}
});