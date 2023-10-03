from django.urls import include, path
from .views import *

urlpatterns = [
    path('', homepage, name='homePage'),
    path('quizStart/', quiz_start_page, name='quizPage'),
    path('quizForm/', quizPage, name='quiz_form'),
    path('quiz/', quiz, name='quiz'),
    path('quizEnd/', quiz_end, name='quiz_end'),
    path('leaderboard/', leaderboardPage, name='leaderboard'),
]
