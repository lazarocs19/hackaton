document.addEventListener('DOMContentLoaded', function () {
    // Carrega o conteúdo do arquivo Receptoras.json usando Fetch
    fetch('Receptoras.json')
        .then(response => response.json())
        .then(data => {
            setLocalStorage(data);
            
            atualizarTabela();
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('bd_inst_beneficiadas')) ?? [];
}

function setLocalStorage(data) {
    localStorage.setItem('bd_inst_beneficiadas', JSON.stringify(data));
};
  
function limparTabela() {
    var elemento = document.querySelector("#inst-beneficiadas");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    };
};
  
function atualizarTabela() {
    const bd_inst_beneficiadas = getLocalStorage();
    limparTabela();
    let index = 0;
    for (instituicao of bd_inst_beneficiadas.instituicoes) {
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
                    <div class="card card-body">${descricao}</div>
                    <div class="card card-img"><img src="${img}" alt="img">
                </div>
            </div>
        </div>
        `

        document.querySelector("#inst-beneficiadas").appendChild(novaLinha_a);

        index++;
    };
};





