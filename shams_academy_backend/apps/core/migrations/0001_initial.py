from django.db import migrations, models
import django.contrib.postgres.fields

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SidebarItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=100, verbose_name='Menu nomi')),
                ('route', models.CharField(max_length=100, verbose_name='URL manzili')),
                ('icon', models.CharField(max_length=100, verbose_name='Ikon')),
                ('roles_visible', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=20), size=None, verbose_name="Ko'rinadigan rollar")),
                ('order', models.IntegerField(default=0, verbose_name='Tartib raqami')),
            ],
            options={
                'verbose_name': 'Yon menyu elementi',
                'verbose_name_plural': 'Yon menyu elementlari',
                'ordering': ['order'],
            },
        ),
    ] 