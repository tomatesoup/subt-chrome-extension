chrome.extension.onMessage.addListener(function(request) {
	var subtitles = JSON.parse(request.subtitle)

	var video = document.getElementsByTagName("video")[0]

	var currentSubtitle = null

	var element = $('<div>')
	
	$('.html5-video-content').append(element)

	function render (text) {
		element.text(text)
	}

	video.addEventListener("timeupdate", function() {
		if (!currentSubtitle) {
			if (subtitles[0].start_time <= video.currentTime) {
				currentSubtitle = subtitles[0]
				subtitles = subtitles.slice(1)
			}
		} else {
			if (video.currentTime >= currentSubtitle.end_time) {
				
				if (video.currentTime >= subtitles[0].start_time) {
					currentSubtitle = subtitles[0]
					subtitles = subtitles.slice(1)
				} else {
					currentSubtitle = null
				}
			}
		}

		if (currentSubtitle) {
			render(currentSubtitle.text)
		} else {
			render('NOTHING!')
		}
	})
})