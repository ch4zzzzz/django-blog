from django.urls import path

from myblog import views

urlpatterns = [
    path('', views.home),
    path('edit/', views.edit),
    path('login/', views.login),
    path('try_login/', views.try_login),
    path('edit_intro_add/', views.edit_intro_add),
    path('self_intro/', views.self_intro),
    path('get_blogs/', views.get_blogs)
]
