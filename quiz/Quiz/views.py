from django.shortcuts import render, redirect, get_object_or_404
from .forms import ParticipantForm
from .models import Participant


# Create your views here.
def homepage(request):
    return render(request, 'index.html')


def quizPage(request):
    if request.method == 'POST':
        form = ParticipantForm(request.POST)
        if form.is_valid():
            participant = form.save()
            print(participant.name)
            print(participant.email)
            print(participant.mobile)
            print(participant.score)
            return redirect('quiz')
    else:
        form = ParticipantForm()
    return render(request, 'quiz_form.html', {'form': form})


def quiz(request):
    # participant = get_object_or_404(Participant, pk=participant_id)
    # if request.method == 'POST':
    #     score = request.POST.get('score')
    #     if score is not None:
    #         participant.score = score
    #         participant.save()
    #     return redirect('quiz_end')

    return render(request, 'quiz.html')


def quiz_end(request):
    return render(request, 'leaderboard.html')


def quiz_start_page(request):
    return render(request, 'quiz_start_page.html')


def leaderboardPage(request):
    return render(request, 'leaderboard.html')
