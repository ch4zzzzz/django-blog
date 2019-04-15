from django.urls import path, re_path
from myblog import views

urlpatterns = [
    re_path(r'^$', views.home),
    re_path(r'^edit/$', views.edit),
    re_path(r'^login/$', views.login),
    re_path(r'^try_login/$', views.try_login),
    re_path(r'^edit_intro_add/$', views.edit_intro_add),
    re_path(r'^self_intro/$', views.self_intro),
    # re_path(r'^get_blogs/$', views.get_blogs),
    re_path(r'^get_blog_list/$', views.get_blog_list),
    re_path(r'^blog=(?P<id>[0-9]+)/$', views.blog_post),
    re_path(r'^get_blog=(?P<id>[0-9]+)/$', views.get_blog),
    re_path(r'^test/$', views.test),
]
