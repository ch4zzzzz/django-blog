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

  let csrftoken = $.cookie('csrftoken');
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

  //个人信息
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
  });

  //博客
  $.getJSON("/myblog/get_blog_list/", function(jsonResult){
      console.log(jsonResult);
      let data = jsonResult.data;
      let $blog_content = $('#blogs');
      // let converter = new showdown.Converter();
      let html = "";
      let rawHtml = str => {
        return str.replace('>', '&gt;').replace('<', '&lt;');
      }
      $.each(data, function(i, obj){
        let id = obj.id;
        let title = rawHtml(obj.title);
        console.log(title);
        let create_time = obj.create_time;
        let div = `
        <div class='blog' id=${id}>
          <div class="blog-header">
            <a href="#"><h3>${title} ${time_transform(create_time)}</h3></a>
          </div>
        </div>`.trim();
        // let div = "<div class='blog'>" + html_text + "</div>"
        html += div;
      });
      $blog_content.append(html);

      $('.blog').click(function(){
          const id = $(this).attr('id');
          const target = `http://127.0.0.1:8000/myblog/blog=${id}/`
          $(location).attr('href', target);
      });
  });


})
