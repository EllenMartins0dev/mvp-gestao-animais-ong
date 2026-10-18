
const animais = [
    {
        id: 1,
        nome: "Luna",
        especie: "Cão",
        sexo: "Fêmea",
        idade: "2 anos",
        microchip: "CH001",
        status: "Disponível",
        cuidados: "Vacinação em dia. Castração realizada."
    },
    {
        id: 2,
        nome: "Thor",
        especie: "Cão",
        sexo: "Macho",
        idade: "4 anos",
        microchip: "CH002",
        status: "Em tratamento",
        cuidados: "Em acompanhamento veterinário."
    },
    {
        id: 3,
        nome: "Mel",
        especie: "Cão",
        sexo: "Fêmea",
        idade: "1 ano",
        microchip: "CH003",
        status: "Adotado",
        cuidados: "Vacinação registrada."
    },
    {
        id: 4,
        nome: "Pipoca",
        especie: "Cão",
        sexo: "Macho",
        idade: "6 meses",
        microchip: "CH004",
        status: "Disponível",
        cuidados: "Aguardando avaliação veterinária."
    }
];

const listaAnimais = document.getElementById("lista-animais");
const campoBusca = document.getElementById("busca-animal");
const filtroStatus = document.getElementById("filtro-status");
const mensagemVazia = document.getElementById("mensagem-vazia");
const quantidadeResultados = document.getElementById("quantidade-resultados");
const modal = document.getElementById("modal-animal");
const detalhesAnimal = document.getElementById("detalhes-animal");
const botaoFecharModal = document.getElementById("fechar-modal");

function obterClasseStatus(status) {
    if (status === "Disponível") {
        return "bg-green-100 text-green-800";
    }

    if (status === "Adotado") {
        return "bg-blue-100 text-blue-800";
    }

    return "bg-amber-100 text-amber-800";
}

function renderizarAnimais() {
    const busca = campoBusca.value.trim().toLowerCase();
    const statusSelecionado = filtroStatus.value;

    const filtrados = animais.filter((animal) => {
        const correspondeBusca =
            animal.nome.toLowerCase().includes(busca) ||
            animal.microchip.toLowerCase().includes(busca);

        const correspondeStatus =
            statusSelecionado === "" ||
            animal.status === statusSelecionado;

        return correspondeBusca && correspondeStatus;
    });

    listaAnimais.innerHTML = filtrados.map((animal) => `
        <article class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <h3 class="text-xl font-bold text-gray-900">
                        ${animal.nome}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                        ${animal.especie} · ${animal.sexo}
                    </p>
                </div>

                <span class="rounded-full px-3 py-1 text-xs font-semibold ${obterClasseStatus(animal.status)}">
                    ${animal.status}
                </span>
            </div>

            <div class="mt-4 space-y-2 text-sm text-gray-600">
                <p><strong>Idade:</strong> ${animal.idade}</p>
                <p><strong>Microchip:</strong> ${animal.microchip}</p>
            </div>

            <button
                type="button"
                data-animal-id="${animal.id}"
                class="botao-detalhes mt-5 w-full rounded-lg border border-green-800 px-4 py-2 font-semibold text-green-800 hover:bg-green-50">
                Ver detalhes
            </button>
        </article>
    `).join("");

    mensagemVazia.classList.toggle("hidden", filtrados.length > 0);
    quantidadeResultados.textContent =
        `${filtrados.length} resultado(s)`;

    document.getElementById("total-animais").textContent = animais.length;

    document.getElementById("total-disponiveis").textContent =
        animais.filter((animal) => animal.status === "Disponível").length;

    document.getElementById("total-adotados").textContent =
        animais.filter((animal) => animal.status === "Adotado").length;
}

function abrirDetalhes(id) {
    const animal = animais.find((item) => item.id === id);

    if (!animal) return;

    const campos = [
        ["Nome", animal.nome],
        ["Espécie", animal.especie],
        ["Sexo", animal.sexo],
        ["Idade", animal.idade],
        ["Microchip", animal.microchip],
        ["Situação", animal.status],
        ["Cuidados e saúde", animal.cuidados]
    ];

    detalhesAnimal.replaceChildren();

    campos.forEach(([rotulo, valor]) => {
        const linha = document.createElement("p");
        const titulo = document.createElement("strong");

        titulo.textContent = `${rotulo}: `;
        linha.append(titulo, document.createTextNode(valor));
        detalhesAnimal.appendChild(linha);
    });

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    botaoFecharModal.focus();
}

function fecharModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

campoBusca.addEventListener("input", renderizarAnimais);
filtroStatus.addEventListener("change", renderizarAnimais);

listaAnimais.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".botao-detalhes");

    if (botao) {
        abrirDetalhes(Number(botao.dataset.animalId));
    }
});

botaoFecharModal.addEventListener("click", fecharModal);

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        fecharModal();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !modal.classList.contains("hidden")) {
        fecharModal();
    }
});

renderizarAnimais();
