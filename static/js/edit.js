$(document).ready(function(){

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

    //头像
    $('#self-photo').attr('src', '/static/img/photo.jpg');

    //读取个人信息
    $.getJSON("/myblog/self_intro/", function(jsonResult){
        console.log(jsonResult);
        let data = jsonResult.data;
        let $self_intro = $('#self-intro');
        let html = "";

        $.each(data, function(key, value){
            let mid = "<li>"+key+": "+value +"</li>" ;
            html += mid;
        })
        $self_intro.append(html);
        console.log(html);
    });


    $('#intro-add').click(function(){
      let $name = $('#info-item-name').val();
      let $content = $('#info-item-content').val();
      //判断是否为空
      if($name.length==0 || $content.length==0){
        return false;
      }

      $('#self-intro-saving').html('保存中');


      $.ajax({
        type: "POST",
        url: "/myblog/edit_intro_add/",
        contentType: "application/json",
				dataType: "json",
				data: JSON.stringify({
					"name": $name,
					"content": $content,
				}),
        success: function(jsonResult){
					console.log(jsonResult);
					if(jsonResult.status){
            //status==1: fail
            $('#self-intro-saving').html(jsonResult.msg);
					}
					else {
            //成功
            //存入数据库后，更新页面
            $('#info-item-name').val("");
            $('#info-item-content').val("");
            $('#self-intro-saving').html('已完成数据更新');
            let new_intro = "<li>"+$name+": "+$content+"</li>";
            let $self_intro = $('#self-intro');
            $self_intro.append(new_intro);
					}
				}
      });
      return false;
    });


    
})
