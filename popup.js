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
			// $(event.target).hide()
		})	
	})
		// .done()
		// .fail()
	})





