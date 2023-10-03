from django.db import models

# Create your models here.

from django.db import models


class Participant(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.name
