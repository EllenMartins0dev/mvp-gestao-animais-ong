
from django.urls import path
from . import views

urlpatterns = [
    path("", views.inicio, name="inicio"),
    path("animais/", views.listar_animais, name="animais"),
    path("animais/cadastrar/", views.cadastro_animal, name="cadastro_animal"),
    path("cuidados/", views.cuidados, name="cuidados"),
    path("adocoes/", views.adocoes, name="adocoes"),
]
