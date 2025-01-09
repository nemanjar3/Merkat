# Generated by Django 5.1.4 on 2025-01-08 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merkatapp', '0006_user_profile_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatRoom',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('participants', models.ManyToManyField(related_name='chat_rooms', to='merkatapp.user')),
            ],
        ),
        migrations.DeleteModel(
            name='Message',
        ),
    ]
