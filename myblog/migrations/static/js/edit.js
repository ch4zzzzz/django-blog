var time_transform = function time_transform(datetime_str){
  let datetime = datetime_str;
  let ret = "";
  let mid1 = datetime.split("-");
  datetime = mid1[0] + "年" + mid1[1]+ "月" + mid1[2];
  let mid2 = datetime.split("T");
  datetime = mid2[0] + "日 " + mid2[1];
  let mid3 = datetime.split(".");
  datetime = mid3[0];
  ret = datetime;
  return ret;
}

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

    //添加个人信息
    // $('#intro-add').click(function(){
    //   let $name = $('#info-item-name').val();
    //   let $content = $('#info-item-content').val();
    //   //判断是否为空
    //   if($name.length==0 || $content.length==0){
    //     return false;
    //   }
    //
    //   $('#self-intro-saving').html('保存中');
    //
    //   $.ajax({
    //     type: "POST",
    //     url: "/myblog/edit_intro_add/",
    //     contentType: "application/json",
		// 		dataType: "json",
		// 		data: JSON.stringify({
		// 			"name": $name,
		// 			"content": $content,
		// 		}),
    //     success: function(jsonResult){
		// 			console.log(jsonResult);
		// 			if(jsonResult.status){
    //         //status==1: fail
    //         $('#self-intro-saving').html(jsonResult.msg);
		// 			}
		// 			else {
    //         //成功
    //         //存入数据库后，更新页面
    //         $('#info-item-name').val("");
    //         $('#info-item-content').val("");
    //         $('#self-intro-saving').html('已完成数据更新');
    //         let new_intro = "<li>"+$name+": "+$content+"</li>";
    //         let $self_intro = $('#self-intro');
    //         $self_intro.append(new_intro);
		// 			}
		// 		}
    //   });
    //   return false;
    // });

    //博客
    $.getJSON("/myblog/get_blog_list/", function(jsonResult){
        console.log(jsonResult);
        let data = jsonResult.data;
        let $blog_content = $('#blogs');
        let converter = new showdown.Converter();
        let html = "";
        $.each(data, function(i, obj){
          let md_text = obj.content;
          let id = obj.id;
          let title = obj.title;
          let create_time = obj.create_time;
          let div = `
          <div class='blog' id=${id}>
            <div class="blog-header">
              <h3>${title} ${time_transform(create_time)}</h3>
              <span class="blog-options">
                <button class="read blog-option" type="button">查看</button>
                <button class="modify blog-option" type="button">修改</button>
                <button class="delete blog-option" type="button">删除</button>
              </span>
            </div>
          </div>`.trim();
          // let div = "<div class='blog'>" + html_text + "</div>"
          html += div;
        });
        $blog_content.append(html);

        $('.blog').click(function(){
            const id = $(this).attr('id');

            return false;
        });

    });

})
