# -*- coding: utf-8 -*-
from myblog import models


def get():
    data = models.BlogPost.objects.all()
    print(data)
    return data
