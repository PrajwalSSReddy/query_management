# Generated by Django 5.1.4 on 2024-12-17 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('task_users', '0002_alter_customuser_groups_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='groups',
            field=models.ManyToManyField(related_name='customuser_groups', related_query_name='customuser', to='auth.group'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='user_permissions',
            field=models.ManyToManyField(related_name='customuser_permissions', related_query_name='customuser', to='auth.permission'),
        ),
    ]
