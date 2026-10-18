
from django.shortcuts import render


def inicio(request):
    return render(request, "inicio.html")


def listar_animais(request):
    return render(request, "gestao_animais.html")


def cadastro_animal(request):
    return render(request, "cadastro_animal.html")


def cuidados(request):
    return render(request, "cuidados.html")


def adocoes(request):
    return render(request, "adocoes.html")
