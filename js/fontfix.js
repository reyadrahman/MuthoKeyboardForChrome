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
