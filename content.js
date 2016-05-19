chrome.extension.onMessage.addListener(function (request) {

  var subs = JSON.parse(request.subtitle);
  var video = document.getElementsByTagName('video')[0];
  var subsContainer = document.createElement('div');
  var videoPlayer = document.querySelector('#player-api');

  videoPlayer.appendChild(subsContainer);

  Object.assign(subsContainer.style, {
    position: 'absolute',
    backgroundColor: 'black',
    left: 0,
    right: 0,
    bottom: '50px',
    zIndex: 35,
    textAlign: 'center',
    maxWidth: '60%',
    margin: '0 auto',
    fontSize: '21px',
    color: 'white'
  });

  function render(text) {
    if (text) {
      text = text[0] + '<br>' + (text[1] || '');
      subsContainer.style.display = 'block';
      subsContainer.innerHTML = text;
    } else {
      subsContainer.style.display = 'none';
    }
  }

  video.addEventListener('timeupdate', function () {
    var currentSub = subs.filter(function (sub) {
      return sub.start_time <= video.currentTime && sub.end_time >= video.currentTime;
    })[0];
    render(currentSub ? currentSub.text : null);
  });
});
