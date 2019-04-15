# -*- coding: utf-8 -*-
from myblog import models


def getAll():
    data = models.BlogPost.objects.all()
    print(data)
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
