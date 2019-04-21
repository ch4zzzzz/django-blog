$(document).ready(function(){

	$(".top").load("/static/top.html");


	$("#login").click(function(){

		var $username = $("#username").val();
		var $password = $("#password").val();
		if($username.length==0 || $password.length==0){
			alert("请输入用户名和密码");
		}
		else {

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
				url: "/myblog/try_login/",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify({
					"username": $username,
					"password": $password,

				}),
				// headers:{ "X-CSRFtoken": Cookies.get('csrftoken')},

				//
				success: function(jsonResult){
					console.log(jsonResult);
					if(jsonResult.status){
						alert("wrong");
					}

					// 页面跳转
					else {
						var target = 'http://127.0.0.1:8000/' + jsonResult.msg;
						 $(location).attr('href', target);
					}
				}
			});
		}
		return false;
	});

	$("#sign-in").click(false);




});
