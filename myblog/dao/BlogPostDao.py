# -*- coding: utf-8 -*-
from myblog import models


def getAll():
    data = models.BlogPost.objects.all()
    return data


def getBlogById(id):
    try:
        blog = models.BlogPost.objects.get(id=id)
        jsonBlog = {
            "id": blog.id,
            "create_time": blog.create_time,
            "type": blog.type,
            "content": blog.content,
            "title": blog.title,
        }

    except:
        return False
    return jsonBlog


def create(title, content, type):
    ret = {
        "success": False,
        "id": False
    }
    try:
        lastBlog = models.BlogPost.objects.last()
        if lastBlog:
            id = lastBlog.id + 1
        else:
            id = 1
        blog = models.BlogPost(id=id, type=type, content=content, title=title)
        blog.save()
        ret["success"] = True
        ret["id"] = id

    except:
        return ret
    return ret


def updateContent(id, content):
    ret = {
        "success": False,
        "id": id,
    }
    try:
        blog = models.BlogPost.objects.get(id=id)
    except:
        return ret
    blog.update(content=content)
    return ret


def delete(id):
    ret = {
        "success": False,
        "wrongID": []
    }
    for i in id:
        try:
            blog = models.BlogPost.objects.get(id=i)
            blog.delete()
        except:
            ret["wrongID"].append(i)
    ret["success"] = True
    return ret
