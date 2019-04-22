# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import JsonResponse
from myblog import auth
import json
from myblog.dao import SelfIntroDao, BlogPostDao


def home(request):
    return render(request, 'myblog.html')


def edit(request):
    return render(request, 'edit.html')


def self_intro(request):
    if request.method == "GET":
        ret = {
            "status": 0,
            "msg": "",
            "data": {},
        }

        SelfIntro = SelfIntroDao.get()
        for item in SelfIntro:
            ret["data"][item.name] = item.content
        ret["msg"] = "success"
        return JsonResponse(ret)
    return render(request, "edit.html")


def edit_intro_add(request):
    if request.method == "POST":
        ret = {"status": 0, "msg": ""}
        data = json.loads(request.body)
        name = data['name']
        content = data['content']
        add_ret = SelfIntroDao.add(name, content)
        if add_ret:
            ret["status"] = 1
            ret["msg"] = name + "已存在"
        else:
            ret["msg"] = "success"
        return JsonResponse(ret)

    return render(request, "edit.html")


# def get_blogs(request):
#     if request.method == "GET":
#         ret = {
#             "status": 0,
#             "msg": "",
#             "data": [],
#         }
#         BlogPost = BlogPostDao.get()
#
#         for item in BlogPost:
#             ret["data"].append({
#                 "id": item.id,
#                 "create_time": item.create_time,
#                 "type": item.type,
#                 "content": item.content,
#                 "title": item.title,
#             })
#     return JsonResponse(ret)


def get_blog_list(request):
    ret = {
        "status": 1,
        "msg": "fail",
        "data": [],
    }
    if request.method == "GET":

        BlogPost = BlogPostDao.getAll()

        for item in BlogPost:
            ret["data"].append({
                "id": item.id,
                "create_time": item.create_time,
                "type": item.type,
                "title": item.title,
            })
        ret["status"] = 0
        ret["msg"] = "success"
    return JsonResponse(ret)


# 博文页
def blog_post(request, id):
    ret = {
        "status": 1,
        "msg": "wrong",
    }
    blog = BlogPostDao.getBlogById(id)
    if blog:
        ret["status"] = 0
        ret["msg"] = "success"
        return render(request, 'blog-post.html', {"blog": blog})
    return JsonResponse(ret)


def get_blog(request, id):
    ret = {
        "status": 1,
        "msg": "wrong",
    }
    blog = BlogPostDao.getBlogById(id)
    if blog:
        ret["status"] = 0
        ret["msg"] = "success"
        ret["blog"] = blog
        JsonResponse(ret)
    return JsonResponse(ret)


def save_blog(request):
    ret = {"status": 1, "msg": "wrong"}
    if request.method == "POST":
        data = json.loads(request.body)
        id = data['id']
        title = data['title']
        content = data['content']
        type = data['type']
        if(id=='null'):
            DAO_ret = BlogPostDao.create(title, content, type)
            if DAO_ret["success"]:
                ret["status"] = 0
                ret["msg"] = "博文创建完成"
                ret["id"] = DAO_ret["id"]
            else:
                ret["msg"] = "创建记录失败"
        else:
            DAO_ret = BlogPostDao.updateContent(id, content)
            if DAO_ret["success"]:
                ret["status"] = 0
                ret["msg"] = "博文已更新"
                ret["id"] = DAO_ret["id"]
            else:
                ret["msg"] = "该博客不存在"

    return JsonResponse(ret)


def delete_blog(request):
    ret = {
        "status": 1,
        "msg": "wrong",
    }
    if request.method == "POST":
        data = json.loads(request.body)
        id = data["id"]  # id是一个id数组
        DAORet = BlogPostDao.delete(id)
        if len(DAORet["wrongID"]) > 0:
            ret["wrongID"] = DAORet["wrongID"]
            ret["status"] = 2
            ret["msg"] = "warning"
        else:
            ret["status"] = 0
            ret["msg"] = "success"
    return JsonResponse(ret)



def login(request):
    return render(request, 'login.html')


def try_login(request):
    if request.method == "POST":
        # 初始化一个给AJAX返回的数据
        ret = {"status": 0, "msg": ""}
        # 从提交过来的数据中 取到用户名和密码
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = auth.authenticate(username, password)

        if user:
            auth.login(request, user)
            ret["msg"] = "myblog/edit"
        else:
            ret["status"] = 1
            ret["msg"] = "用户名密码错误"
        return JsonResponse(ret)
    return render(request, "login.html")


def test(request):
    return render(request, "test.html")
