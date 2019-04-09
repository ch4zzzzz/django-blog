# -*- coding: utf-8 -*-
from myblog import models


def add(name, content):
    add_ret = 1
    try:
        user = models.SelfIntro.objects.get(name=name)
    except:
        new = models.SelfIntro(name=name, content=content)
        new.save()
        add_ret = 0
    finally:
        return add_ret


def get():
    data = models.SelfIntro.objects.all()
    return data
