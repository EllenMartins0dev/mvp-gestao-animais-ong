
/*
 * Dashboard inicial — Vira Lata Vira Vida
 *
 * ATENÇÃO:
 * Estes dados são fictícios, usados somente para desenvolver
 * e testar a interface. Posteriormente, serão substituídos
 * pelos dados reais fornecidos pelo Django.
 */

const animaisDemonstrativos = [
    {
        nome: "Luna",
        identificacao: "CH001",
        situacao: "Disponível"
    },
    {
        nome: "Thor",
        identificacao: "CH002",
        situacao: "Em processo de adoção"
    },
    {
        nome: "Mel",
        identificacao: "CH003",
        situacao: "Adotado"
    },
    {
        nome: "Pipoca",
        identificacao: "CH004",
        situacao: "Disponível"
    }
];

const cuidadosDemonstrativos = [
    {
        animal: "Thor",
        procedimento: "Acompanhamento veterinário",
        status: "Em andamento",
        prioridade: "Acompanhar"
    },
    {
        animal: "Pipoca",
        procedimento: "Avaliação veterinária",
        status: "Pendente",
        prioridade: "Verificar"
    }
];

function atualizarIndicadores() {
    const totalAnimais = animaisDemonstrativos.length;

    const totalDisponiveis = animaisDemonstrativos.filter(
        animal => animal.situacao === "Disponível"
    ).length;

    const totalProcessos = animaisDemonstrativos.filter(
        animal => animal.situacao === "Em processo de adoção"
    ).length;

    const totalCuidados = cuidadosDemonstrativos.filter(
        cuidado => cuidado.status === "Pendente"
    ).length;

    document.getElementById("total-animais").textContent = totalAnimais;
    document.getElementById("total-disponiveis").textContent = totalDisponiveis;
    document.getElementById("total-processos").textContent = totalProcessos;
    document.getElementById("total-cuidados").textContent = totalCuidados;
}

function criarItemCuidado(cuidado) {
    const item = document.createElement("article");

    item.className =
        "flex flex-col gap-3 rounded-lg border border-slate-200 " +
        "p-4 sm:flex-row sm:items-center sm:justify-between";

    const informacoes = document.createElement("div");

    const nomeAnimal = document.createElement("h3");
    nomeAnimal.className = "font-semibold text-slate-900";
    nomeAnimal.textContent = cuidado.animal;

    const procedimento = document.createElement("p");
    procedimento.className = "mt-1 text-sm text-slate-600";
    procedimento.textContent = cuidado.procedimento;

    informacoes.append(nomeAnimal, procedimento);

    const situacao = document.createElement("span");
    situacao.className =
        cuidado.status === "Pendente"
            ? "inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 " +
              "text-xs font-semibold text-amber-800"
            : "inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 " +
              "text-xs font-semibold text-blue-800";

    situacao.textContent = cuidado.status;

    item.append(informacoes, situacao);

    return item;
}

function renderizarCuidados() {
    const lista = document.getElementById("lista-pendencias");

    lista.replaceChildren();

    if (cuidadosDemonstrativos.length === 0) {
        const mensagem = document.createElement("p");

        mensagem.className = "text-sm text-slate-600";
        mensagem.textContent = "Não há cuidados demonstrativos para exibir.";

        lista.appendChild(mensagem);
        return;
    }

    cuidadosDemonstrativos.forEach(cuidado => {
        lista.appendChild(criarItemCuidado(cuidado));
    });
}

function inicializarDashboard() {
    atualizarIndicadores();
    renderizarCuidados();
}

inicializarDashboard();
