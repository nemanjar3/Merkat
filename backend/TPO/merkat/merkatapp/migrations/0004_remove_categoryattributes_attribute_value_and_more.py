# Generated by Django 5.1.4 on 2024-12-21 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('merkatapp', '0003_categoryattributes_attribute_value_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='categoryattributes',
            name='attribute_value',
        ),
        migrations.RemoveField(
            model_name='subcategoryattributes',
            name='subattribute_value',
        ),
    ]