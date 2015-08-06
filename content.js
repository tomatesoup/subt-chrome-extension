chrome.extension.onMessage.addListener(function(request) {
	
	var subtitles = JSON.parse(request.subtitle)

	var video = document.getElementsByTagName("video")[0]

	var subtitlesContainer = $('<div>')
	subtitlesContainer.css({
		position: 'absolute', 
		'background-color': 'black', 
		left: 0, 
		right: 0, 
		bottom: 50, 
		'z-index': 35, 
		'text-align': 'center', 
		'max-width': '60%', 
		margin: '0 auto',
		'font-size': '21',
		'color': 'white'
	})

	$('.html5-video-content').append(subtitlesContainer)

	function render(text) {
		if (text) {
			var text = text[0] + '<br>' + (text[1] || '')

			if (!subtitlesContainer.is(':visible')) subtitlesContainer.show()

				if (subtitlesContainer.html() !== text) {
					subtitlesContainer.html(text)
				}
			} else {

				if (subtitlesContainer.is(':visible')) subtitlesContainer.hide()

			}
	}

	video.addEventListener("timeupdate", function() {

		var currentSubtitle = subtitles.filter(function(sub) {
			return sub.start_time <= video.currentTime && sub.end_time >= video.currentTime
		})[0]

		if (currentSubtitle) {
			render(currentSubtitle.text)
		} else {
			render(null)
		}
	})
})