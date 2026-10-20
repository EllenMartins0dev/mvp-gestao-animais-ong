
document.addEventListener("DOMContentLoaded", function () {
    const formularioDoacao = document.querySelector(
        'form input[name="formulario"][value="doacao"]'
    )?.closest("form");

    if (!formularioDoacao) return;

    const tipoDoacao = formularioDoacao.querySelector(
        'select[name$="tipo"]'
    );

    const areaFinanceira = document.getElementById("area-financeira");
    const metodoPagamento = document.getElementById("metodo_pagamento");

    const infoCartao = document.getElementById("info-cartao");
    const infoPix = document.getElementById("info-pix");
    const infoBoleto = document.getElementById("info-boleto");
    const tipoCartao = document.getElementById("tipo_cartao");

    function esconderDetalhesPagamento() {
        infoCartao.hidden = true;
        infoPix.hidden = true;
        infoBoleto.hidden = true;

        if (tipoCartao) {
            tipoCartao.value = "";
        }
    }

    function atualizarMetodoPagamento() {
        esconderDetalhesPagamento();

        switch (metodoPagamento.value) {
            case "credito":
                infoCartao.hidden = false;
                tipoCartao.value = "Crédito";
                break;

            case "debito":
                infoCartao.hidden = false;
                tipoCartao.value = "Débito";
                break;

            case "pix":
                infoPix.hidden = false;
                break;

            case "boleto":
                infoBoleto.hidden = false;
                break;
        }
    }

    function atualizarTipoDoacao() {
        const financeira =
            tipoDoacao.value.trim().toLowerCase() === "financeira";

        areaFinanceira.hidden = !financeira;

        if (!financeira) {
            metodoPagamento.value = "";
            esconderDetalhesPagamento();
            return;
        }

        atualizarMetodoPagamento();
    }

    async function copiarTexto(texto, mensagem) {
        try {
            await navigator.clipboard.writeText(texto);
            mensagem.textContent = "Código copiado com sucesso!";
        } catch (erro) {
            mensagem.textContent =
                "Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.";
        }
    }

    document.getElementById("copiar-pix")?.addEventListener("click", function () {
        copiarTexto(
            document.getElementById("codigo-pix").value,
            document.getElementById("mensagem-pix")
        );
    });

    document.getElementById("copiar-boleto")?.addEventListener("click", function () {
        copiarTexto(
            document.getElementById("linha-boleto").value,
            document.getElementById("mensagem-boleto")
        );
    });

    tipoDoacao?.addEventListener("change", atualizarTipoDoacao);
    metodoPagamento?.addEventListener("change", atualizarMetodoPagamento);

    // Estado inicial: tudo relacionado ao pagamento fica escondido.
    esconderDetalhesPagamento();
    areaFinanceira.hidden = true;

    // Atualiza conforme o tipo de doação selecionado.
    atualizarTipoDoacao();
});
