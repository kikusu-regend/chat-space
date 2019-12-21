$(function() {

  var reloadMessages = function() {

    last_message_id = $('.main_chat__contents__tweets:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main_chat__contents').append(insertHTML);
      $('.main_chat__contents').animate({ scrollTop: $('.main_chat__contents')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }


      var buildHTML = function(message){
        const BUILD_HTML = 
        `<div class="main_chat__contents__tweets" data-message-id=` + message.id + `>` +
          `<div class="main_chat__contents__tweets__name">` +
            message.user_name +
          `</div>` +   
          `<div class="main_chat__contents__tweets__date">` +
            message.created_at +
          `</div>` + 
        `</div>`   
        if (message.content && message.image ) {
          var html = 
            BUILD_HTML  + 
            `<div class="main_chat__contents__massage">` +
              message.content +
            `</div>` +
            `<img src="` + message.image + `" >` 
        } else if (message.content) { 
          var html =
            BUILD_HTML +
            `<div class="main_chat__contents__massage">` +
              message.content +
            `</div>` 
        } else if (message.image) {
          var html =
            BUILD_HTML +
            `<img src="` + message.image + `" >` 
        };
        return html;
      };
  $('#new_message').on('submit', function(e){
    e.preventDefault(); 
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__contents').append(html);
      $('.main_chat__contents').animate({ scrollTop: $('.main_chat__contents')[0].scrollHeight});
      $('form')[0].reset();
      $('.main_chat__form__right_send').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
});

