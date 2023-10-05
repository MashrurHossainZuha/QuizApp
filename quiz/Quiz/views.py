from django.shortcuts import render, redirect, get_object_or_404
from .forms import ParticipantForm
from .models import Participant
from django.http import JsonResponse


# Create your views here.
def homepage(request):
    return render(request, 'index.html')


def quizPage(request):
    if request.method == 'POST':
        form = ParticipantForm(request.POST)
        if form.is_valid():
            participant = form.save()
            return redirect('quiz', participant_id=participant.pk)
    else:
        form = ParticipantForm()
    return render(request, 'quiz_form.html', {'form': form})


def quiz(request, participant_id):
    participant = get_object_or_404(Participant, pk=participant_id)
    print(participant.name)
    print(participant.mobile)
    print(participant.email)

    return render(request, 'quiz.html', {'participant': participant, 'participant_id': participant_id})


def save_score(request, participant_id):
    if request.method == 'POST':
        participant = get_object_or_404(Participant, pk=participant_id)
        score = request.POST.get('score')
        if score is not None:
            participant.score = score
            participant.save()
            return JsonResponse({'message': 'Score saved successfully'})

    # return JsonResponse({'error': 'Invalid request'}, status=400)


def quiz_end(request):
    return render(request, 'leaderboard.html')


def quiz_start_page(request):
    return render(request, 'quiz_start_page.html')


def leaderboardPage(request):
    return render(request, 'leaderboard.html')
