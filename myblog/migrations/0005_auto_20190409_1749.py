# Generated by Django 2.1.7 on 2019-04-09 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myblog', '0004_auto_20190408_1947'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='url',
        ),
        migrations.AddField(
            model_name='blogpost',
            name='content',
            field=models.TextField(default='text', verbose_name='博文内容'),
        ),
    ]
