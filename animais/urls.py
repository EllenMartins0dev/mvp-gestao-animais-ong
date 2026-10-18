from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path("", views.inicio, name="inicio"),

    path(
        "login/",
        auth_views.LoginView.as_view(template_name="login.html"),
        name="login",
    ),

    path(
        "logout/",
        auth_views.LogoutView.as_view(),
        name="logout",
    ),

    path("animais/", views.listar_animais, name="animais"),
    path("animais/cadastrar/", views.cadastro_animal, name="cadastro_animal"),
    path("cuidados/", views.cuidados, name="cuidados"),
    path("adocoes/", views.adocoes, name="adocoes"),
]