const botao = document.getElementById('botao');
botao.addEventListener('click', enviarEmail);

function enviarEmail() {
    const nome = encodeURIComponent(document.getElementById('nome').value);
    const assunto = encodeURIComponent(document.getElementById('assunto').value);
    const mensagem = encodeURIComponent(document.getElementById('mensagem').value);

    if (nome == "" || assunto == "" || mensagem == "") {
        alert('Preencha corretamente os campos!');
        return;
    } else {
        window.open(`mailto:ifes@ifes.com.br?subject=${assunto}&body=Oi, eu sou o(a) ${nome}, ${mensagem}`, "_blank");
    }
}