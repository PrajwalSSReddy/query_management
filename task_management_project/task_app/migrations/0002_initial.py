# Generated by Django 5.1.4 on 2024-12-17 13:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('task_app', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='task',
            name='groups',
            field=models.ManyToManyField(related_name='task_groups', related_query_name='task', to='auth.group'),
        ),
        migrations.AddField(
            model_name='task',
            name='user_permissions',
            field=models.ManyToManyField(related_name='task_user_permissions', related_query_name='task', to='auth.permission'),
        ),
    ]
