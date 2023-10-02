from django.urls import include, path
from .views import *

urlpatterns = [
    path('', homepage, name='homePage'),
    path('quiz/', quizPage, name='quizPage'),
    path('leaderboard/', leaderboardPage, name='leaderboard'),
]
