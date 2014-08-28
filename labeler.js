function showMatches() {
	// var matches=$('body').text().replace(/[13n][1-9A-Za-z][^OIl]{20,40}/,"REPLACED");
	$('.txlist-address span').html(function(index,html) {
		var mod=html;
		for(i=0;i<localStorage.length;i++) {
			var key=localStorage.key(i);
			mod=mod.replace(key,localStorage.getItem(key));
		}
		return mod;
	});
}

document.addEventListener('contextmenu',handleContextMenu,false);
safari.self.addEventListener("message",handleMessage,false);
	
function handleContextMenu(event) {
	var addr=window.getSelection().toString().match(/^[13n][1-9A-Za-z][^OIl]{20,40}$/);
	if(addr!=null)
	  safari.self.tab.setContextMenuEventUserInfo(event,addr);
}

function handleMessage(event) {
	if(event.name==="addLabel") {
		var label=prompt("Label for "+event.message,localStorage.getItem(event.message));
		if(label==null) {
			return;
		}
		else if(label==="") {
			localStorage.removeItem(event.message);
		}
		else {
			localStorage.setItem(event.message,label);
			$('.txlist-address span').html(function(index,html) {
				return html.replace(event.message,label);
			});
		}
	}
}
	
MutationObserver = window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
  showMatches();
});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  characterData: true
	  //...
});