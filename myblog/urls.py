# -*- coding: utf-8 -*-
from django.urls import path, re_path
from myblog import views

urlpatterns = [
    re_path(r'^$', views.home),  # 主页
    re_path(r'^edit/$', views.edit),  # 编辑
    re_path(r'^login/$', views.login),  # 登录
    re_path(r'^try_login/$', views.try_login),
    re_path(r'^edit_intro_add/$', views.edit_intro_add),  # 添加个人信息
    re_path(r'^self_intro/$', views.self_intro),   # 读取个人信息
    # re_path(r'^get_blogs/$', views.get_blogs),
    re_path(r'^get_blog_list/$', views.get_blog_list),  # 读取博客列表
    re_path(r'^blog=(?P<id>[0-9]+)/$', views.blog_post),  # 读取某个博客
    re_path(r'^get_blog=(?P<id>[0-9]+)/$', views.get_blog),  # 读取某个博客
    re_path(r'^save_blog/$', views.save_blog),  # 保存博客
    re_path(r'^delete_blog/$', views.delete_blog),  # 删除博客
    re_path(r'^test/$', views.test),
]
