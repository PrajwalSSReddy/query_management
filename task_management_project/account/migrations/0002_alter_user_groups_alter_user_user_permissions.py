# Generated by Django 5.1.4 on 2024-12-17 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='custom_user_groups', related_query_name='user1', to='auth.group', verbose_name='groups'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='custom_user_permissions', related_query_name='user1', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
