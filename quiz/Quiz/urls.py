from django.urls import include, path
from .views import *

urlpatterns = [
    path('', homepage, name='homePage'),
    path('quizStart/', quiz_start_page, name='quizPage'),
    path('leaderboard/', leaderboardPage, name='leaderboard'),

    path('quiz/', quizPage, name='quiz_form'),
    path('quiz/<int:participant_id>', quiz, name='quiz'),
    path('quiz/end', quiz_end, name='quiz_end'),
    path('quiz/save_score/<int:participant_id>/', save_score, name='save_score')
]
