function criarTarefa(tarefa){
        var linha = document.createElement("li");
        var lixeira = document.createElement("span");
            lixeira.className = "material-icons delete"
            lixeira.innerHTML = "delete";
        var campo = document.createElement("span");
            campo.className = "texto";
            campo.innerHTML = tarefa;
        var lapis = document.createElement("span");
            lapis.className = "material-icons edit"
            lapis.innerHTML = "edit"
        var baixo = document.createElement("span");
            baixo.className = "material-icons down"
            baixo.innerHTML = "expand_more"
        var cima = document.createElement("span");
            cima.className = "material-icons up"
            cima.innerHTML = "expand_less"
        var direita = document.createElement("div");
        $(direita).append(lapis,baixo,cima);
        $(linha).append(lixeira,campo,direita);
        $("ul").append(linha);
    }
$(function () {
    $("ul").on("click","li",function(event){
        $(this).find(".texto").toggleClass("sublinhado");
        event.stopPropagation();
    });
    $("ul").on("click",".delete",function(event){
        $(this).parent().remove();
        event.stopPropagation();
    });
    $("ul").on("click",".up",function(event){
        const $eleLista = ($(this).parent().parent());
        $eleLista.prev().before($eleLista);
        event.stopPropagation();
    });
    $("ul").on("click",".down",function(event){
        const $eleLista = ($(this).parent().parent());
        $eleLista.next().after($eleLista);
        event.stopPropagation();
    });
    $("form").on("submit",function(event){
        var tarefa = $("#novaTarefa").val();
        criarTarefa(tarefa);
        event.stopPropagation();
    });
    $("h1").on("click",".add",function (event) {
        if ($("input").length && $("input").val().length) {
            var tarefa = $("#novaTarefa").val();
            criarTarefa(tarefa);
            event.stopPropagation();
        } else {
            $("input").fadeToggle(1000);
        }
    })
});
