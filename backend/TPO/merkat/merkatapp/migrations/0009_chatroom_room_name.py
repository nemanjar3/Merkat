# Generated by Django 5.1.4 on 2025-01-10 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merkatapp', '0008_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatroom',
            name='room_name',
            field=models.CharField(max_length=255, null=True, unique=True),
        ),
    ]
