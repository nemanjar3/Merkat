# Generated by Django 5.1.4 on 2024-12-21 13:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merkatapp', '0004_remove_categoryattributes_attribute_value_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ListingAttributeValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=1024)),
                ('attribute', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='merkatapp.categoryattributes')),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attribute_values', to='merkatapp.listing')),
                ('subcategory_attribute', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='merkatapp.subcategoryattributes')),
            ],
        ),
    ]
