document.addEventListener('DOMContentLoaded', function () {
    // Ler JSON alimentos
    let bd_alimentos = getLocalStorageAlimentos();
    if (bd_alimentos.length === 0) {
        fetch('/JSON/alimentos.json')
            .then(response => response.json())
            .then(data => {
                setLocalStorageAlimentos(data);
                bd_alimentos = data;
                atualizarTabelaAlimentos(bd_alimentos);
            })
            .catch(error => console.error('Erro ao carregar o arquivo JSON dos alimentos:', error));
    } else {
        atualizarTabelaAlimentos(bd_alimentos);
    }
    
    // Ler JSON instituicoes
    let bd_instituicoes = getLocalStorageInstituicoes();
    if (bd_instituicoes.length === 0) {
        fetch('/JSON/instituicoes.json')
            .then(response => response.json())
            .then(data => {
                setLocalStorageInstituicoes(data);
                bd_instituicoes = data;
                atualizarTabelaInstituicoes(bd_instituicoes);
            })
            .catch(error => console.error('Erro ao carregar o arquivo JSON das entidades receptoras:', error));
    } else {
        atualizarTabelaInstituicoes(bd_instituicoes);
    };

});

const btnCadastrarAlimento = document.getElementById("btnCadastrarAlimento");
btnCadastrarAlimento.addEventListener('click', CadastrarAlimento);

const btnVisualizarDoacoes = document.getElementById("btnVisualizarDoacoes");
btnVisualizarDoacoes.addEventListener('click', atualizarTabelaDoacoes);

const btnConfirmarDoacao = document.getElementById("btnConfirmarDoacao");
btnConfirmarDoacao.addEventListener('click', CadastrarDoacao);

const btnConhecerInstituicoes = document.getElementById("btnConhecerInstituicoes");
btnConhecerInstituicoes.addEventListener('click', ListarConhecerInstituicoes)

// Tratativas para options dos alimentos

function setLocalStorageAlimentos(data) {
    localStorage.setItem('bd_alimentos', JSON.stringify({ alimentos: data }));
};

function getLocalStorageAlimentos() {
    const data = JSON.parse(localStorage.getItem('bd_alimentos'));
    return data && data.alimentos ? data.alimentos : [];
}
  
function limparTabelaAlimentos() {
    var elemento = document.querySelector("#lista-alimentos");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    };
};
  
function atualizarTabelaAlimentos() {
    const bd_alimentos = getLocalStorageAlimentos();
    limparTabelaAlimentos();

    var novaLinha_option = document.createElement('option');
    novaLinha_option.innerHTML = `
        <option value="">Selecione um alimento</option>
    `
    document.querySelector("#lista-alimentos").appendChild(novaLinha_option);

    let index = 0;
    for (const alimento of bd_alimentos.alimentos) {
        var novaLinha_option = document.createElement('option')
        let id = alimento.ID
        let nome = alimento.Nome

        novaLinha_option.innerHTML = `
            <option value="${id}">${nome}</option>
        `
        document.querySelector("#lista-alimentos").appendChild(novaLinha_option);

        index++;
    };
};

function CadastrarAlimento() {

    const bd_alimentos = getLocalStorageAlimentos();
    const ultimaid = bd_alimentos.alimentos.length;

    const nome = document.getElementById('nome-alimento').value
    const imagem = document.getElementById('link-img-alimento').value
    
    if (nome == "" || imagem == "") {
        alert('Preencha corretamente os campos!');
        return;
    } else {
        const alimento = {
            ID: ultimaid + 1,
            Nome: nome,
            Imagem: imagem
        }

        console.log(alimento)

        bd_alimentos.alimentos.push(alimento);
        setLocalStorageAlimentos(bd_alimentos);
        alert('Alimento inserido com sucesso!');
        atualizarTabelaAlimentos();

        document.getElementById('nome-alimento').value = "";
        document.getElementById('link-img-alimento').value = "";
    }
};

// Tratativas para options das instituições

function setLocalStorageInstituicoes(data) {
    localStorage.setItem('bd_instituicoes', JSON.stringify({ instituicoes: data }));
};

function getLocalStorageInstituicoes() {
    const data = JSON.parse(localStorage.getItem('bd_instituicoes'));
    return data && data.instituicoes ? data.instituicoes : [];
}
  
function limparTabelaInstituicoes() {
    var elemento = document.querySelector("#lista-instituicoes");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    };
};
  
function atualizarTabelaInstituicoes() {
    const bd_instituicoes = getLocalStorageInstituicoes();
    limparTabelaInstituicoes();

    var novaLinha_option = document.createElement('option');
    novaLinha_option.innerHTML = `
        <option value="">Selecione uma instituição</option>
    `
    document.querySelector("#lista-instituicoes").appendChild(novaLinha_option);

    let index = 0;
    for (const instituicao of bd_instituicoes.instituicoes) {
        var novaLinha_option = document.createElement('option')
        let id = instituicao.ID
        let nome = instituicao.Nome

        novaLinha_option.innerHTML = `
            <option value="${id}">${nome}</option>
        `
        document.querySelector("#lista-instituicoes").appendChild(novaLinha_option);

        index++;
    };
};


// Tratativas Formulário de Doação

function setLocalStorageDoacoes(data) {
    localStorage.setItem('bd_doacoes', JSON.stringify({ doacoes: data }));
}

function getLocalStorageDoacoes() {
    const data = JSON.parse(localStorage.getItem('bd_doacoes'));
    return data && data.doacoes ? data.doacoes : [];
}

function limparTabelaDoacoes() {
    var elemento = document.querySelector("#lista-doacoes");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    };
};

function atualizarTabelaDoacoes() {
    // Ler JSON doacoes
    let bd_doacoes = getLocalStorageDoacoes();
    
    if (bd_doacoes === null || !bd_doacoes.doacoes || bd_doacoes.doacoes.length === 0) {
        // Se não houver doações no localStorage, carregue do JSON
        fetch('/JSON/doacoes.json')
            .then(response => response.json())
            .then(data => {
                setLocalStorageDoacoes(data);
                bd_doacoes = data;
                exibirDoacoes(bd_doacoes);
            })
            .catch(error => console.error('Erro ao carregar o arquivo JSON das doações:', error));
    } else {
        // Se houver doações no localStorage, exiba diretamente
        exibirDoacoes(bd_doacoes);
    }
}

function exibirDoacoes(bd_doacoes) {
    limparTabelaDoacoes();
    let index = 0;

    for (const doacao of bd_doacoes.doacoes) {
        const novaLinha_a = document.createElement('a');
        let id = doacao.ID;
        let doador = doacao.Doador;
        let beneficiario = doacao.Beneficiario;
        let alimento = doacao.Alimento;
        let datavalidade = doacao.DataValidade;
        let quantidade = doacao.Quantidade;

        let datavalidadeBR = new Date(datavalidade).toLocaleDateString('pt-BR')

        if (datavalidadeBR == 'Invalid Date') {
            datavalidadeBR = datavalidade
        }

        novaLinha_a.innerHTML = `
        <div class="row ms-2" id="lista-doacoes">
            <a class="bi bi-plus-circle-fill p-3" data-bs-toggle="collapse" href="#Collapse${id}" role="button"
                aria-expanded="false" aria-controls="Collapse${id}"> Doador: ${doador} → Beneficiário: ${beneficiario}</a>
            <div class="col-12">
                <div class="collapse multi-collapse" id="Collapse${id}">
                    <div class="card card-body">Alimento: ${alimento}</div>
                    <div class="card card-body">Data de Validade: ${datavalidadeBR}</div>
                    <div class="card card-body">Quantidade: ${quantidade} Kg</div>
                </div>
            </div>
        </div>
        `;
        document.querySelector("#lista-doacoes").appendChild(novaLinha_a);

        index++;
    }
}

function CadastrarDoacao() {

    const bd_doacoes = getLocalStorageDoacoes();
    const ultimaid = bd_doacoes.doacoes.length;

    const doador = document.getElementById('doador').value
    const endereco = document.getElementById('endereco').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value
    const beneficiario = document.getElementById('lista-instituicoes').value
    const alimento = document.getElementById('lista-alimentos').value
    const validade = document.getElementById('data-validade').value
    const quantidade = document.getElementById('qtde-alimento').value
    
    if (doador == "" || endereco == "" || email == "" || telefone == "" || beneficiario == "" || alimento == "" || validade == "" || quantidade == "" || beneficiario == "Selecione uma instituição" || alimento == "Selecione um alimento") {
        alert('Preencha corretamente os campos!');
        return;
    } else {
        const doacao = {
            ID: ultimaid + 1,
            Doador: doador,
            Endereco: endereco,
            Email: email,
            Telefone: telefone,
            Beneficiario: beneficiario,
            Alimento: alimento,
            DataValidade: validade,
            Quantidade: quantidade
        }

        bd_doacoes.doacoes.push(doacao);
        setLocalStorageDoacoes(bd_doacoes);
        alert('Sua doação foi efetuada com sucesso!');
        atualizarTabelaDoacoes();
    }
};

function ListarConhecerInstituicoes() {
    const bd_instituicoes = getLocalStorageInstituicoes();
    limparTabelaConhecerInstituicoes();
    let index = 0;
    for (const instituicao of bd_instituicoes.instituicoes) {
        const novaLinha_a = document.createElement('a');
        let id = instituicao.ID
        let nome = instituicao.Nome
        let descricao = instituicao.Descricao
        let img = instituicao.Imagem

        novaLinha_a.innerHTML = `
        <div class="row" id="lista-instituicoes-offcanvas">
            <a class="bi bi-plus-circle-fill" data-bs-toggle="collapse" href="#Collapse${id}" role="button"
                aria-expanded="false" aria-controls="Collapse${id}"> ${nome}</a>
            <div class="col-12">
                <div class="collapse multi-collapse" id="Collapse${id}">
                    <div class="card card-img bg-black"><img src="${img}" alt="img"></div>
                    <div class="card card-body">${descricao}</div>
                </div>
            </div>
        </div>
        `
        document.querySelector("#lista-instituicoes-offcanvas").appendChild(novaLinha_a);

        index++;
    };
};

function limparTabelaConhecerInstituicoes() {
    var elemento = document.querySelector("#lista-instituicoes-offcanvas");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    };
};