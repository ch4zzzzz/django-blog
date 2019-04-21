
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
    // ajax引入博文
    // $.getJSON("/myblog/get_blog=4/", function(jsonResult){
    //     console.log(jsonResult);
    //     let blog = jsonResult.blog;
    //     let $test = $('#test');
    //     $test.append(blog.content);
    // });
    let converter = new showdown.Converter();
    let $blog_body = $('.blog-body');
    let md_text = $blog_body.text().trim();
    let html = converter.makeHtml(md_text);
    $blog_body.replaceWith(`
      <div class="blog-body">${html}</div>`);


})
