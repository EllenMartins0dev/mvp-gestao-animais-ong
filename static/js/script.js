
(function () {
    function inicializarAcessibilidade() {
        const diminuir = document.getElementById("diminuir-fonte");
        const aumentar = document.getElementById("aumentar-fonte");
        const restaurar = document.getElementById("restaurar-fonte");
        const anuncio = document.getElementById("anuncio-fonte");

        if (!diminuir || !aumentar || !restaurar) {
            console.error("Acessibilidade: botões não encontrados.");
            return;
        }

        const tamanhos = [87.5, 100, 112.5, 125, 137.5, 150];
        const chave = "tamanhoFonteAcessibilidade";
        let indiceAtual = 1;

        try {
            const salvo = Number(localStorage.getItem(chave));
            const indiceSalvo = tamanhos.indexOf(salvo);

            if (indiceSalvo !== -1) {
                indiceAtual = indiceSalvo;
            }
        } catch (erro) {
            // Continua com o tamanho padrão.
        }

        function aplicarTamanho() {
            const tamanho = tamanhos[indiceAtual];

            document.documentElement.style.setProperty(
                "font-size",
                tamanho + "%",
                "important"
            );

            diminuir.disabled = indiceAtual === 0;
            aumentar.disabled = indiceAtual === tamanhos.length - 1;

            try {
                localStorage.setItem(chave, String(tamanho));
            } catch (erro) {
                // O ajuste continua funcionando sem salvar a preferência.
            }

            if (anuncio) {
                anuncio.textContent = "Tamanho do texto: " + tamanho + "%.";
            }

            console.log("Acessibilidade funcionando:", tamanho + "%");
        }

        aumentar.addEventListener("click", function () {
            if (indiceAtual < tamanhos.length - 1) {
                indiceAtual++;
                aplicarTamanho();
            }
        });

        diminuir.addEventListener("click", function () {
            if (indiceAtual > 0) {
                indiceAtual--;
                aplicarTamanho();
            }
        });

        restaurar.addEventListener("click", function () {
            indiceAtual = 1;
            aplicarTamanho();
        });

        aplicarTamanho();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            inicializarAcessibilidade
        );
    } else {
        inicializarAcessibilidade();
    }
})();
