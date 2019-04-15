# -*- coding: utf-8 -*-
from django.db import models


class User(models.Model):
    username = models.CharField(max_length=20, verbose_name='用户名')
    password = models.CharField(max_length=20, verbose_name='密码')
    last_login = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)


class SelfIntro(models.Model):
    name = models.CharField(max_length=20, verbose_name="介绍项名")
    content = models.CharField(max_length=20, verbose_name="介绍内容")
    create_time = models.DateTimeField(auto_now_add=True)


# 照片和博文数等
# class UserMeta(models.Model):
#     username = models.CharField(max_length=20, verbose_name='用户名')
#     photo_url = models.CharField(max_length=50, verbose_name="照片地址")
#     blog_num = models.IntegerField(verbose_name="博文数")
#     num_of_view = models.IntegerField(verbose_name="访客数")

class BlogPost(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    id = models.IntegerField(primary_key=True)
    type = models.CharField(max_length=10, verbose_name="博客类型")  # mini(微博), html, md
    content = models.TextField(default="text", verbose_name="博文内容")
    title = models.CharField(max_length=30, verbose_name="题目")
    # tag = models.CharField(max_length=20, verbose_name="标签")

