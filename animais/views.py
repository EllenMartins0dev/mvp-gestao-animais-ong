
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def inicio(request):
    return render(request, "inicio.html")


@login_required
def listar_animais(request):
    return render(request, "gestao_animais.html")


@login_required
def cadastro_animal(request):
    return render(request, "cadastro_animal.html")


@login_required
def cuidados(request):
    return render(request, "cuidados.html")


@login_required
def adocoes(request):
    return render(request, "adocoes.html")
