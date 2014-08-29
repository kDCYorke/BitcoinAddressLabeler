function updateTXList() {
	$('.txlist-address span').html(function(index,html) {
		var mod=html;
		for(i=0;i<localStorage.length;i++) {
			var key=localStorage.key(i);
			mod=mod.replace(key,localStorage.getItem(key));
		}
		return mod;
	});
}

function updateAddressList() {
	$('.address-list .list-group-item').html(function(index,html) {
		var mod=html;
		var added=mod.search("<small class=\"btcLabel\">");
		if(added>-1) {
			mod=mod.substring(0,added);
		}
		for(i=0;i<localStorage.length;i++) {
			var key=localStorage.key(i);
			if(html.search(key)>-1) {
				mod=mod+"<small class=\"btcLabel\">"+localStorage.getItem(key)+"</small>";	
			}
		}
		return mod;
	});
}

document.addEventListener('contextmenu',handleContextMenu,false);
safari.self.addEventListener("message",handleMessage,false);
	
function handleContextMenu(event) {
	var addr=window.getSelection().toString().match(/^[13nm][1-9A-Za-z][^OIl]{20,40}$/);
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
			updateAddressList();
		}
		else {
			localStorage.setItem(event.message,label);
			$('.txlist-address span').html(function(index,html) {
				return html.replace(event.message,label);
			});
			updateAddressList();
		}
	}
}
	
MutationObserver = window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
  updateTXList();
	updateAddressList();
});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  characterData: true
	  //...
});