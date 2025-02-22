# Generated by Django 5.1.4 on 2024-12-21 12:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merkatapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=256, unique=True),
        ),
        migrations.CreateModel(
            name='CategoryAttributes',
            fields=[
                ('category_attribute_id', models.AutoField(primary_key=True, serialize=False)),
                ('attribute_name', models.CharField(max_length=1024)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='merkatapp.category')),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('subcategory_id', models.AutoField(primary_key=True, serialize=False)),
                ('subcategory_name', models.CharField(max_length=1024)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='merkatapp.category')),
            ],
        ),
        migrations.AddField(
            model_name='listing',
            name='subcategory',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='merkatapp.subcategory'),
        ),
        migrations.CreateModel(
            name='SubCategoryAttributes',
            fields=[
                ('subcategory_attribute_id', models.AutoField(primary_key=True, serialize=False)),
                ('attribute_name', models.CharField(max_length=1024)),
                ('subcategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='merkatapp.subcategory')),
            ],
        ),
        migrations.DeleteModel(
            name='Attribute',
        ),
    ]
