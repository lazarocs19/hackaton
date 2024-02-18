document.addEventListener('DOMContentLoaded', function () {
    let bd_instituicoes = getLocalStorage();
    if (bd_instituicoes.length === 0) {
        fetch('/JSON/instituicoes.json')
            .then(response => response.json())
            .then(data => {
                setLocalStorage(data);
                bd_instituicoes = data;
                atualizarTabela(bd_instituicoes);
            })
            .catch(error => console.error('Erro ao carregar o arquivo JSON das entidades receptoras:', error));        
    } else {
        atualizarTabela(bd_instituicoes);
    };
});

const btnCadastrarBeneficiaria = document.getElementById("btnCadastrarBeneficiaria");
btnCadastrarBeneficiaria.addEventListener('click', inserir);

function setLocalStorage(data) {
    localStorage.setItem('bd_instituicoes', JSON.stringify({ instituicoes: data }));
};

function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('bd_instituicoes'));
    return data && data.instituicoes ? data.instituicoes : [];
}
  
function limparTabela() {
    var elemento = document.querySelector("#inst-beneficiadas");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    };
};
  
function atualizarTabela() {
    const bd_instituicoes = getLocalStorage();
    limparTabela();
    let index = 0;
    for (const instituicao of bd_instituicoes.instituicoes) {
        const novaLinha_a = document.createElement('a');
        let id = instituicao.ID
        let nome = instituicao.Nome
        let descricao = instituicao.Descricao
        let img = instituicao.Imagem

        novaLinha_a.innerHTML = `
        <div class="row" id="inst-beneficiadas">
            <a class="bi bi-plus-circle-fill p-3" data-bs-toggle="collapse" href="#Collapse${id}" role="button"
                aria-expanded="false" aria-controls="Collapse${id}"> ${nome}</a>
            <div class="col-12">
                <div class="collapse multi-collapse" id="Collapse${id}">
                    <div class="card card-img bg-black"><img src="${img}" alt="img"></div>
                    <div class="card card-body">${descricao}</div>
                </div>
            </div>
        </div>
        `
        document.querySelector("#inst-beneficiadas").appendChild(novaLinha_a);

        index++;
    };
};

function inserir() {

    const bd_instituicoes = getLocalStorage();
    const ultimaid = bd_instituicoes.instituicoes.length;

    const nome = document.getElementById('receber-nome').value
    const descricao = document.getElementById('receber-descricao').value
    const email = document.getElementById('receber-email').value
    const telefone = document.getElementById('receber-telefone').value
    const endereco = document.getElementById('receber-endereco').value
    const imagem = document.getElementById('receber-imagem').value
    
    if (nome == "" || descricao == "" || email == "" || telefone == "" || endereco == "" || imagem == "") {
        alert('Preencha corretamente os campos!');
        return;
    } else {
        const beneficiaria = {
            ID: ultimaid + 1,
            Nome: nome,
            Descricao: descricao,
            Email: email,
            Telefone: telefone,
            EnderecoCompleto: endereco,
            Imagem: imagem
        }

        bd_instituicoes.instituicoes.push(beneficiaria);
        setLocalStorage(bd_instituicoes);
        atualizarTabela();
        alert('Sua instituição foi cadastrada com sucesso e já está apta a receber doações.');

        // Limpar os campos do formulário
        document.getElementById('receber-nome').value = "";
        document.getElementById('receber-descricao').value = "";
        document.getElementById('receber-email').value = "";
        document.getElementById('receber-telefone').value = "";
        document.getElementById('receber-endereco').value = "";
        document.getElementById('receber-imagem').value = "";
    }
};