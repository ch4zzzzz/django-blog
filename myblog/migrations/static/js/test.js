$(document).ready(function(){
  $('#test').click(function(){
    csrftoken = $.cookie('csrftoken');
    function csrfSafeMethod(method) {
          // these HTTP methods do not require CSRF protection
          return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
          beforeSend: function(xhr, settings) {
              if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                  xhr.setRequestHeader("X-CSRFToken", csrftoken);
              }
          }
      });

    $.ajax({
      type: "POST",
      url: "/myblog/blog=3/",

      // headers:{ "X-CSRFtoken": Cookies.get('csrftoken')},

      //
      success: function(jsonResult){
        console.log(jsonResult);
        if(jsonResult.status){
          alert("wrong");
        }

        // 页面跳转
        else {
          var target = 'http://127.0.0.1:8000/myblog/blog=3/';
           $(location).attr('href', target);
        }
      }
    });
  })
})
