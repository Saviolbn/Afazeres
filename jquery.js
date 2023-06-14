$(document).ready(function () {
    $(".texto").on("click",function(){
        $(this).toggleClass("sublinhado")
    });

    $(".delete").on("click",function(){
        $(this).parent().remove()
    });

    $(".up").on("click",function(){
        const $eleLista = ($(this).parent().parent());
        $eleLista.prev().before($eleLista);
    });
    $(".down").on("click",function(){
        const $eleLista = ($(this).parent().parent());
        $eleLista.next().after($eleLista);
    });
    function criarTarefa(){
        var linha = document.createElement("li");
        var lixeira = document.createElement("span");
        lixeira.className = "material-icons delete"
        lixeira.innerHTML = "delete";
        var campo = document.createElement("span");
        campo.className = "texto"
        campo.innerHTML = "teste";
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
    $("button").on("click",function(){
        criarTarefa();
    });
});