function criarTarefa(tarefa){
        if (!tarefa.val()){return}
        var linha = document.createElement("li");
        var lixeira = document.createElement("span");
            lixeira.className = "material-icons delete"
            lixeira.innerHTML = "delete";
        var campo = document.createElement("span");
            campo.className = "texto";
            campo.innerHTML = tarefa.val();
        var lapis = document.createElement("span");
            lapis.className = "material-icons edit"
            lapis.innerHTML = "edit"
        var baixo = document.createElement("span");
            baixo.className = "material-icons down"
            baixo.innerHTML = "expand_more"
        var cima = document.createElement("span");
            cima.className = "material-icons up"
            cima.innerHTML = "expand_less"
        $(linha).append(lixeira,campo,lapis,baixo,cima);
        $("ul").append(linha);
        tarefa.val("");
    }
$(function () {
    $("ul").on("click","li",function(event){
        $(this).find(".texto").toggleClass("sublinhado");
        event.stopPropagation();
    });
    $("ul").on("click",".delete",function(event){
        $(this).parent().fadeOut(function(){   
            $(this).remove();
        });
        event.stopPropagation();
    });
    $("ul").on("click",".up",function(event){
        const $eleLista = ($(this).parent());
        $eleLista.prev().before($eleLista);
        event.stopPropagation();
    });
    $("ul").on("click",".down",function(event){
        const $eleLista = ($(this).parent());
        $eleLista.next().after($eleLista);
        event.stopPropagation();
    });
    $("form").on("submit",function(event){
        var tarefa = $("#novaTarefa");
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
