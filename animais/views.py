
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Animal
from .forms import AnimalForm
from .forms import DoacaoForm, VoluntarioForm
from .models import Animal, Cuidado


def inicio(request):
    return render(request, "inicio.html")


@login_required
def listar_animais(request):
    animais = Animal.objects.all().order_by("nome")

    return render(
        request,
        "gestao_animais.html",
        {"animais": animais},
    )


@login_required
def cadastro_animal(request):
    if request.method == "POST":
        form = AnimalForm(request.POST)

        if form.is_valid():
            form.save()
            messages.success(
                request,
                "Animal cadastrado com sucesso!"
            )
            return redirect("animais")
    else:
        form = AnimalForm()

    return render(
        request,
        "cadastro_animal.html",
        {"form": form},
    )


@login_required
def cuidados(request):
    return render(request, "cuidados.html")


@login_required
def adocoes(request):
    return render(request, "adocoes.html")


@login_required
def doacoes_voluntarios(request):
    doacao_form = DoacaoForm(prefix="doacao")
    voluntario_form = VoluntarioForm(prefix="voluntario")

    if request.method == "POST":
        if request.POST.get("formulario") == "doacao":
            doacao_form = DoacaoForm(
                request.POST,
                prefix="doacao",
            )
            if doacao_form.is_valid():
                doacao_form.save()
                messages.success(
                    request,
                    "Doação registrada com sucesso!",
                )
                return redirect("doacoes_voluntarios")

        elif request.POST.get("formulario") == "voluntario":
            voluntario_form = VoluntarioForm(
                request.POST,
                prefix="voluntario",
            )
            if voluntario_form.is_valid():
                voluntario_form.save()
                messages.success(
                    request,
                    "Voluntário cadastrado com sucesso!",
                )
                return redirect("doacoes_voluntarios")

    return render(
        request,
        "doacoes_voluntarios.html",
        {
            "doacao_form": doacao_form,
            "voluntario_form": voluntario_form,
        },
    )


@login_required
def cuidados(request):
    animais = Animal.objects.all().order_by("nome")
    cuidados_registrados = Cuidado.objects.select_related(
        "animal"
    ).order_by("-data_realizacao")

    if request.method == "POST":
        animal_id = request.POST.get("animal")
        tipo = request.POST.get("tipo")
        procedimento = request.POST.get("procedimento", "").strip()
        data_realizacao = request.POST.get("data_realizacao")
        proxima_data = request.POST.get("proxima_data") or None
        veterinario = request.POST.get("veterinario", "").strip()
        observacoes = request.POST.get("observacoes", "").strip()

        animal = Animal.objects.filter(pk=animal_id).first()

        if not animal or not tipo or not procedimento or not data_realizacao:
            messages.error(
                request,
                "Preencha os campos obrigatórios corretamente."
            )
        else:
            Cuidado.objects.create(
                animal=animal,
                tipo=tipo,
                procedimento=procedimento,
                data_realizacao=data_realizacao,
                proxima_data=proxima_data,
                veterinario=veterinario,
                observacoes=observacoes,
            )
            messages.success(request, "Cuidado registrado com sucesso!")
            return redirect("cuidados")

    return render(
        request,
        "cuidados.html",
        {
            "animais": animais,
            "cuidados_registrados": cuidados_registrados,
            "tipos_cuidado": Cuidado.TIPOS,
        },
    )
