$(function() {
      function buildHTML(message){
        if ( message.image ) {
          var html = 
            `<div class="main_chat__contents__tweets" data-message-id=${message.id}>
              <div class="main_chat__contents__tweets__name">
                ${message.user_name}
              </div>   
              <div class="main_chat__contents__tweets__date">
                ${message.date}
              </div> 
            </div>   
            <div class="main_chat__contents__massage">
              ${message.content}
            </div>  
            <img src=${message.image} >` 
          return html;
        } else { 
          var html =
            `<div class="main_chat__contents__tweets" data-message-id=${message.id}>
              <div class="main_chat__contents__tweets__name">
                ${message.user_name}
              </div>   
              <div class="main_chat__contents__tweets__date">
                ${message.date}
              </div> 
            </div>   
            <div class="main_chat__contents__massage">
              ${message.content}
            </div>` 
          return html;
        };
      }
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
