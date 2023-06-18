function criarTarefa(tarefa) {
    if (!tarefa.val()) { return }

    const linha = document.createElement("li");
    linha.className = "listItem"

    const lixeira = document.createElement("span");
    lixeira.className = "material-icons delete"
    lixeira.innerText = "delete";

    const campo = document.createElement("span");
    campo.className = "texto";
    campo.innerText = tarefa.val();

    const lapis = document.createElement("span");
    lapis.className = "material-icons edit"
    lapis.innerText = "edit"

    const baixo = document.createElement("span");
    baixo.className = "material-icons down"
    baixo.innerText = "expand_more"

    const cima = document.createElement("span");
    cima.className = "material-icons up"
    cima.innerText = "expand_less"

    $(linha).append(lixeira, campo, lapis, baixo, cima);
    $(".lista").append(linha);
    tarefa.val("");
}

$(function () {
    //marcar como concluida a tarefa
    $(".lista").on("click", "li", function (event) {
        $(this).find(".texto").toggleClass("sublinhado");
        event.stopPropagation();
    });

    //Apagar tarefa
    $(".lista").on("click", ".delete", function (event) {
        $(this).parent().fadeOut(function () {
            $(this).remove();
        });
        event.stopPropagation();
    });

    //Mover o elemento da lista para cima
    $(".lista").on("click", ".up", function (event) {
        const eleLista = $(this).parent();
        eleLista.prev().before($eleLista);
        event.stopPropagation();
    });

    //Mover o elemento da lista para baxio
    $(".lista").on("click", ".down", function (event) {
        const eleLista = $(this).parent();
        eleLista.next().after($eleLista);
        event.stopPropagation();
    });

    //Adicionar tarefa a lista
    $(".listaFormulario").on("submit", function (event) {
        const tarefa = $("#novaTarefa");
        criarTarefa(tarefa);
        event.stopPropagation();
    });

    //Lida com a funcionalidade do botão "+"
    $(".listaTitulo").on("click", ".add", function (event) {
        const novoInput = $(".listaInput");
        if (novoInput.length && novoInput.val().length) {
            criarTarefa(novoInput);
            event.stopPropagation();
        } else {
            $(".listaFormulario").fadeToggle(1000);
        }
    })
});
