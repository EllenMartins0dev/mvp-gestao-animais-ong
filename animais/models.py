
from django.db import models


class Animal(models.Model):
    ESPECIES = [
        ("Cachorro", "Cachorro"),
        ("Gato", "Gato"),
        ("Outro", "Outro"),
    ]

    SEXOS = [
        ("Macho", "Macho"),
        ("Fêmea", "Fêmea"),
        ("Não identificado", "Não identificado"),
    ]

    SITUACOES = [
        ("Disponível", "Disponível para adoção"),
        ("Em processo", "Em processo de adoção"),
        ("Adotado", "Adotado"),
    ]

    nome = models.CharField(max_length=100)
    especie = models.CharField(max_length=20, choices=ESPECIES, default="Cachorro")
    sexo = models.CharField(max_length=30, choices=SEXOS)
    data_entrada = models.DateField()
    data_nascimento = models.DateField(null=True, blank=True)
    porte = models.CharField(max_length=30, blank=True)
    cor = models.CharField(max_length=50, blank=True)
    microchip = models.CharField(max_length=100, blank=True)
    descricao = models.TextField(blank=True)
    situacao = models.CharField(
        max_length=20,
        choices=SITUACOES,
        default="Disponível",
    )

    def __str__(self):
        return self.nome


class Cuidado(models.Model):
    TIPOS = [
        ("Vacinação", "Vacinação"),
        ("Castração", "Castração"),
        ("Consulta", "Consulta veterinária"),
        ("Tratamento", "Tratamento"),
        ("Outro", "Outro"),
    ]

    animal = models.ForeignKey(
        Animal,
        on_delete=models.CASCADE,
        related_name="cuidados",
    )
    tipo = models.CharField(max_length=20, choices=TIPOS)
    procedimento = models.CharField(max_length=150)
    data_realizacao = models.DateField()
    proxima_data = models.DateField(null=True, blank=True)
    veterinario = models.CharField(max_length=100, blank=True)
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.animal.nome} - {self.procedimento}"


class Adocao(models.Model):
    STATUS = [
        ("Em análise", "Em análise"),
        ("Aprovada", "Aprovada"),
        ("Concluída", "Concluída"),
        ("Cancelada", "Cancelada"),
    ]

    animal = models.ForeignKey(
        Animal,
        on_delete=models.PROTECT,
        related_name="processos_adocao",
    )
    nome_adotante = models.CharField(max_length=150)
    telefone = models.CharField(max_length=30)
    email = models.EmailField(blank=True)
    data_solicitacao = models.DateField(auto_now_add=True)
    data_conclusao = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="Em análise",
    )
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.animal.nome} - {self.nome_adotante}"
