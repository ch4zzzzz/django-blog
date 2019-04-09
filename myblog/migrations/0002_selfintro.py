# Generated by Django 2.1.7 on 2019-04-04 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myblog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SelfIntro',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, verbose_name='介绍项名')),
                ('content', models.CharField(max_length=20, verbose_name='介绍内容')),
                ('create_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]