document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('enviarDepoimento').addEventListener('click', function () {
        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var data = new Date().toISOString().split('T')[0]; // Obtendo a data atual
        var depoimentoTexto = document.getElementById('depoimento').value;

        if (nome === '' || email === '' || depoimentoTexto === '') {
            alert('Preencha Nome, E-mail e seu depoimento, por favor.');
            return;
        }

        var depoimentoObj = {
            id: getNewDepoimentoId(), // Função para obter um novo ID de depoimento
            nome: nome,
            email: email,
            data: data,
            depoimento: depoimentoTexto
        };

        var depoimentosSalvos = JSON.parse(localStorage.getItem('depoimentos')) || [];

        depoimentosSalvos.push(depoimentoObj);

        localStorage.setItem('depoimentos', JSON.stringify(depoimentosSalvos));

        alert('Depoimento enviado com sucesso!');

        document.getElementById('formDepoimento').reset();

        carregarDepoimentosSalvos();
    });

    function carregarDepoimentosSalvos() {
        var depoimentosSalvos = JSON.parse(localStorage.getItem('depoimentos')) || [];

        document.getElementById('depoimentoContainer').innerHTML = '';

        for (var i = 0; i < depoimentosSalvos.length; i++) {
            var depoimento = depoimentosSalvos[i];
            var dataformatada = formatarData(depoimento.data)

            var depoimentoElement = document.createElement('p');
            depoimentoElement.innerHTML = `
                <strong>${depoimento.nome}</strong> em ${dataformatada}:
                <br>${depoimento.depoimento}
                <hr>
            `;
            
            document.getElementById('depoimentoContainer').appendChild(depoimentoElement);
        }
    }

    function getNewDepoimentoId() {
        var depoimentosSalvos = JSON.parse(localStorage.getItem('depoimentos')) || [];
        return depoimentosSalvos.length + 1;
    }

    function formatarData(data) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
        return new Date(data).toLocaleDateString('pt-BR', options);
    }

    carregarDepoimentosSalvos();

});
