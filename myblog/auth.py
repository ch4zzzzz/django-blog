from myblog import models


def authenticate(username, password):
    try:
        user = models.User.objects.get(username=username)
    except:
        print('user not found')
        return False
    if(user.password != password):
        return False
    return user


def login(request, user):
    return True
