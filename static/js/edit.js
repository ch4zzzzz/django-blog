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

    //tab页面转换
    $('#tab-menu li').click(function(){
      let $this = $(this);
      let thisIndex = $this.index();
      let $current = $('#tab-menu .active');
      let currentIndex = $current.index();
      if(thisIndex!==currentIndex){
        $current.removeClass('active');
        $this.addClass('active');
        let $tabs= $('#tabs');
        $tabs.children().eq(currentIndex).slideUp();
        $tabs.children().eq(thisIndex).slideDown();
      }
      return false;
    });

    //头像
    $('#self-photo').attr('src', '/static/img/photo.jpg');

    //读取个人信息
    $.getJSON("/myblog/self_intro/", function(jsonResult){
        // console.log(jsonResult);
        let data = jsonResult.data;
        let $self_intro = $('#self-intro');
        let html = "";

        $.each(data, function(key, value){
            let mid = "<li>"+key+": "+value +"</li>" ;
            html += mid;
        })
        $self_intro.append(html);
        // console.log(html);
    });

    //添加个人信息
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
					// console.log(jsonResult);
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

    //博客
    $.getJSON("/myblog/get_blog_list/", function(jsonResult){
        // console.log(jsonResult);
        let data = jsonResult.data;
        let $blog_list = $('#blog-list');
        let html = "";
        let rawHtml = str => {
          return str.replace('>', '&gt;').replace('<', '&lt;');
        }
        $.each(data, function(i, obj){
          let id = obj.id;
          let title = rawHtml(obj.title);
          let create_time = obj.create_time;
          let div = `
          <li id="${id}"><h3>${title} ${time_transform(create_time)}</h3>
            <span class="options">
              <a class="read" href="#">查看</a>
              <a class="edit" href="#">修改</a>
            </span>
          </li>
          `.trim();
          html += div;
        });
        $blog_list.append(html);

        //查看博客
        $('#blog-list>li>.options>.read').click(function(){
          // <li>的id
          const id = $(this).parent().parent().attr('id');
          const target = `http://127.0.0.1:8000/myblog/get_blog=${id}/`;

          $.getJSON(target, function(jsonResult){
            let title = rawHtml(jsonResult.blog.title);
            let blog_content = rawHtml(jsonResult.blog.content);
            let create_time = jsonResult.blog.create_time;
            let converter = new showdown.Converter();
            let md_text = blog_content.trim()
            let html_text = converter.makeHtml(md_text);
            let html = $(`
            <div class="blog" id="blog${id}">
              <a class="back-to-list" href="#">返回列表</a>
    					<h3>${title} <small>${time_transform(create_time)}</small></h3>
    					<div class="content">${html_text}</div>
    				</div>`.trim());
            let $blog_list_tab = $('#blog-list-tab');
            html.appendTo($blog_list_tab);
            $blog_list.slideUp();
            $('#blog-list-tab>.blog>.back-to-list').click(function(){
              $(this).parent().slideUp();
              $blog_list.slideDown();
              return false;
            })
          });

          return false;
        });
    });

    //保存博文
    $('#save-blog').click(function(){
      let blog_id = $('#blog-id').val();
      let title = $('#blog-title').val();
      let content = $('#edit-textarea').val();
      if(title.length==0){
        alert("请输入标题");
      }
      else if(content.length==0){
        alert("内容不能为空");
      }
      else{
        $.ajax({
  				type: "POST",
  				url: "/myblog/save_blog/",
  				contentType: "application/json",
  				dataType: "json",
  				data: JSON.stringify({
  					"id": blog_id,
  					"title": title,
            "content": content,
            "type": 'md',
  				}),
          success: function(jsonResult){
            alert(jsonResult.msg);
            if(!jsonResult.status){
              $('#blog-title').val("");
              $('#edit-textarea').val("");
              $('#tab-menu li:eq(1)').click();
            }

          }
        });

      }
      return false;
    });

})
