from django.shortcuts import render


# Create your views here.
def homepage(request):
    return render(request, 'index.html')


def quizPage(request):
    return render(request, 'quiz.html')


def leaderboardPage(request):
    return render(request, 'leaderboard.html')
