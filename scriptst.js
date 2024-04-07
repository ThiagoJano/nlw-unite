// inscrição
// participantes

//obj js

let participantes = [
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 0o1)
    },
    {
        nome: "Antonyo Brito",
        email: "anton@gmail.com",
        dataInscricao: new Date(2024, 4, 12, 19, 20),
        dataCheckIn: null
    },
    {
        nome: "Caio Brito",
        email: "caio@gmail.com",
        dataInscricao: new Date(2024, 3, 22, 19, 20),
        dataCheckIn: new Date(2024, 3, 25, 22, 0o1)
    },
    {
        nome: "Danilo Brito",
        email: "danilo@gmail.com",
        dataInscricao: new Date(2024, 5, 22, 19, 20),
        dataCheckIn: null
    },
    {
        nome: "Eitor Brito",
        email: "eitor@gmail.com",
        dataInscricao: new Date(2024, 6, 22, 19, 20),
        dataCheckIn: new Date(2024, 6, 25, 22, 0o1)
    }
]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn  = dayjs(Date.now()).to(participante.dataCheckIn)

    //condicional. colocando o botão data de check-in para os cadastragos recentemente 
    if(participante.dataCheckIn == null) {
        dataCheckIn = `
        <button 
           data-email="${participante.email}"
           onclick="fazerCheckIn(event)" 
        >
           Confirmar check-in
        </button>
        `
        //ainda vamos criar esse fazerCheck-in
    }
    return ` 
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong>
            <br>
            <small>
                ${participante.email}
            </small>
        </td>
        <td>
            ${dataInscricao}
        </td>
        <td>
            ${dataCheckIn}
        </td>
    </tr>`
}

const atualizarLista = (participantes) => {
    let output = ""
    //Estrutura de repetição
    for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }

    //substituir info do html
    document.querySelector('tbody').innerHTML = output //query > pesquisa - selector > seletor - pesquisa por seletor -- .innerHTML > consigo trocar o valo dele
    // objeto documento - pesquisa um seletor (..). propriedade pra trocar valor = "oq vai ser colocado"
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target) 
    // FormData fala de qual formulario vai pegar os dados
    //.target = alvo. qual é o alvo do eventosubmit (form)
    // falando pra pegar os dados do formulário e colocar nessa variável
    
    //alert(dadosDoFormulario.get('nome'))
    //pegando do form da variavel name

    //novo obj
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(), //data de agora
        dataCheckIn: null
    }

    // verificar se o participante já existe 
    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
    )

    if(participanteExiste) {
        alert('Email já  cadastrado!')
        return
    }

    //agr vamos adicionar esse novo ob participante na lista de participantes
    participantes = [participante, ...participantes]// participante novo ... os d+ q ja tinha
    atualizarLista(participantes)

    
    // Limpar formulario
    event.target.querySelector('[name="nome]').value = ""
    event.target.querySelector('[name="email]').value = ""
}

const fazerCheckIn = (event) => {
    //alert("chegamos aqui")
    const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"
    if(confirm(mensagemConfirmacao) == false){
        return
    }

    // Encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    // Atualizara lista de participantes
    atualizarLista(participantes)
}