from django.contrib import admin
from myblog import models
# Register your models here.


class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'create_time')


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'last_login', 'is_active')


class SelfIntroAdmin(admin.ModelAdmin):
    list_display = ('name', 'content')


admin.site.register(models.User, UserAdmin)
admin.site.register(models.SelfIntro, SelfIntroAdmin)
admin.site.register(models.BlogPost, BlogPostAdmin)
