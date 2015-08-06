var baseUrl = 'http://localhost:3000/search';

$('#search-form').on('submit', function(event) {
	event.preventDefault()
	var id = $(event.target).data('id')
	var searchTerm = $('#search-box').val();
	var request = $.get(baseUrl + '.json' + '?search=' + searchTerm);

	request.done(function(data) {
		var list = $('<ul>')

		data.forEach(function(subtitle) {
			var element = $('<li>')
			element.text(subtitle.title)
			element.attr('data-id', subtitle.id)

			list.append(element)
		})

		$('#subtitle-container').html(list)
		$('#subtitle-container').on('click', 'li', function(event) {
			event.preventDefault()

			var subtitleId = $(event.target).attr('data-id')
			var subtitleRequest = $.get(`http://localhost:3000/subtitles/${subtitleId}.json`)

			subtitleRequest.done(function(data) {
				chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.sendMessage(tab.id, { subtitle: JSON.stringify(data) })
				})
			})
		})	
	})
})





