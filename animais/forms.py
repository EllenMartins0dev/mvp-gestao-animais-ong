
from django import forms
from .models import Animal
from .models import Doacao, Voluntario


class AnimalForm(forms.ModelForm):
    class Meta:
        model = Animal
        fields = [
            "nome",
            "especie",
            "sexo",
            "data_entrada",
            "data_nascimento",
            "porte",
            "cor",
            "microchip",
            "descricao",
            "situacao",
        ]

        labels = {
            "nome": "Nome do animal",
            "especie": "Espécie",
            "sexo": "Sexo",
            "data_entrada": "Data de entrada na ONG",
            "data_nascimento": "Data de nascimento",
            "porte": "Porte",
            "cor": "Cor",
            "microchip": "Número do microchip",
            "descricao": "Características e observações",
            "situacao": "Situação para adoção",
        }

        widgets = {
            "data_entrada": forms.DateInput(
                attrs={"type": "date"}
            ),
            "data_nascimento": forms.DateInput(
                attrs={"type": "date"}
            ),
            "descricao": forms.Textarea(
                attrs={"rows": 4}
            ),
        }

class DoacaoForm(forms.ModelForm):
    class Meta:
        model = Doacao
        fields = [
            "nome_doador",
            "tipo",
            "descricao",
            "valor",
            "quantidade",
            "data_doacao",
            "observacoes",
        ]
        labels = {
            "nome_doador": "Nome do doador",
            "tipo": "Tipo de doação",
            "descricao": "Descrição da doação",
            "valor": "Valor (R$), se aplicável",
            "quantidade": "Quantidade, se aplicável",
            "data_doacao": "Data da doação",
            "observacoes": "Observações",
        }
        widgets = {
            "data_doacao": forms.DateInput(attrs={"type": "date"}),
            "observacoes": forms.Textarea(attrs={"rows": 3}),
        }


class VoluntarioForm(forms.ModelForm):
    class Meta:
        model = Voluntario
        fields = [
            "nome",
            "telefone",
            "email",
            "disponibilidade",
            "habilidades",
        ]
        labels = {
            "nome": "Nome completo",
            "telefone": "Telefone",
            "email": "E-mail",
            "disponibilidade": "Disponibilidade",
            "habilidades": "Habilidades e atividades de interesse",
        }
        widgets = {
            "habilidades": forms.Textarea(attrs={"rows": 3}),
        }
