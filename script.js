// referenciando input

let input = document.querySelector('#inp');

// referenciando o botao

let btn = document.querySelector('#botao');

// referenciando lista 

let lista = document.querySelector('#lista');

// referenciando o card 

let card = document.querySelector('.card');

// criando um array no banco de dados do navegador

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

criarTarefa();

function criarTarefa() {

    lista.innerHTML = '';

    for (tarefa of tarefas) {

        // criar item de lista 

        let itemLista = document.createElement('li');

        // criar classe no item de lista

        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //adicionar evento de click no elemento de li

        itemLista.onclick = function () {
            deletarTarefa(this);
        }

        // criar texto dentro do li

        let itemTexto = document.createTextNode(tarefa);

        // adicionar o texto ao elemento li

        itemLista.appendChild(itemTexto);

        //adicionar o item nde lista na ul resgatando o id

        lista.appendChild(itemLista);

    }
}


btn.onclick = function () {

    // nova tarefa 

    let novaTarefa = input.value;

    if(novaTarefa !== '') {

        // adicionar valores ao array tarefa

        tarefas.push(novaTarefa);

        //executar função

        criarTarefa()

        // limpar campo

        input.value = '';

        // função para remover mensagem de erro

        removerSpans();

        //salvando novos dados no storage (banco de dados)

        salvandoDados();


    } else {

        // função para remover mensagem de erro

        removerSpans();

        // criando mensagem de erro caso não seja 
        // digitada uma tarefa

        let span = document.createElement('span');

        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Informe uma tarefa!');

        span.appendChild(msg);

        card.appendChild(span);


    }


}

function removerSpans () {

    let spans = document.querySelectorAll('span');

    for (let i = 0; i < spans.length; i++) {

        card.removeChild(spans[i]);

    }

}

function deletarTarefa (tar) {

    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    criarTarefa();

    //salvando novos dados no storage (banco de dados)

    salvandoDados();

}

// salvando dados no storage (banco de dados nativo do navegador)

function salvandoDados () {

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

}