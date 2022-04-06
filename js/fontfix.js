var f = '';

try {
	chrome.storage.local.get('banglaFont', function (items) {
		if (chrome.runtime.error) {
			console.log(chrome.runtime.error);
			f = 'Siyam Rupali';
		} else {
			f = items.banglaFont || 'Siyam Rupali';
		}
		c(f);
	});
} catch (e) {
	f = 'Siyam Rupali';
	c(f);
}

function c(f) {
	var e = document.querySelector('body');
	var s = document.createElement('style');
	var b = (Math.floor(Math.random() * 999) + 100).toString();
	s.appendChild(document.createTextNode("\
		@font-face {\
				font-family: Bangla" + b + ";\
				src: local('" + f + "');\
				unicode-range: U+0980-09FF;\
		}\
		body {\
			font-family: Bangla" + b + ", " + window.getComputedStyle(e, null).getPropertyValue("font-family") + ";\
		}\
	"));
