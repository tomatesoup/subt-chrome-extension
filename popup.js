var HOST = 'http://localhost:3000';

$('#search-form').on('submit', function (event) {
  event.preventDefault();
  var searchTerm = $('#search-box').val();
  var request = $.get(`${HOST}/search.json?search=${searchTerm}`);

  request.done(function (data) {
    var list = $('<ul>');

    data.forEach(function (subtitle) {
      var element = $('<li>');
      element.text(subtitle.title);
      element.attr('data-id', subtitle.id);

      list.append(element);
    });

    $('#subtitle-container').html(list);
    $('#subtitle-container').on('click', 'li', function (event) {
      event.preventDefault();

      var subtitleId = $(event.target).attr('data-id');
      var subtitleRequest = $.get(`${HOST}/subtitles/${subtitleId}.json`);

      subtitleRequest.done(function (data) {
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.sendMessage(tab.id, {
            subtitle: JSON.stringify(data)
          });
        });
      });
    });
  });
});
