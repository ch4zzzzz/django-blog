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

  $.getJSON("/myblog/get_blogs/", function(jsonResult){
      console.log(jsonResult);
      let data = jsonResult.data;
      let $blog_content = $('#blogs');
      let converter = new showdown.Converter();
      let html = "";
      $.each(data, function(i, obj){
        let md_text = obj.content;
        let title = obj.title;
        let create_time = obj.create_time;
        let html_text = converter.makeHtml(md_text);
        let div = `
        <div class='blog'>
          <div class="blog-header">
            <a href="#"><h3>${title} ${time_transform(create_time)}</h3></a>
          </div>
          <div class="content">${html_text}</div>
        </div>`.trim();
        // let div = "<div class='blog'>" + html_text + "</div>"
        html += div;
      });
      $blog_content.append(html);

  });

  // let converter = new showdown.Converter();
  //   text = ;
  //   html = converter.makeHtml(text);

})
