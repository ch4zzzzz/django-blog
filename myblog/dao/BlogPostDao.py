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
    try:
        lastBlog = models.BlogPost.objects.last()
        if lastBlog:
            id = lastBlog.id + 1
        blog = models.BlogPost(id=id, type=type, content=content, title=title)
        print(blog)
        blog.save()
        print('t')
    except:
        return False
    return True


def updateContent(id, content):
    try:
        blog = models.BlogPost.objects.get(id=id)
    except:
        return False
    blog.update(content=content)
    return True
