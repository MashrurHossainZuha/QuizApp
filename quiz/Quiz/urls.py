from django.urls import include, path
from .views import *

urlpatterns = [
    path('', homepage, name='homePage'),
    path('quizStart/', quiz_start_page, name='quizPage'),
    path('quiz/', quizPage, name='quiz'),
    path('leaderboard/', leaderboardPage, name='leaderboard'),
]
