function gerarLi(texto, sublinhado, id) {

    const linha = document.createElement("li");
    linha.className = "listItem"
    linha.dataset.id = id;

    const lixeira = document.createElement("span");
    lixeira.className = "material-icons delete"
    lixeira.innerText = "delete";

    const campo = document.createElement("span");
    campo.className = "texto";
    campo.innerText = texto;
    if (sublinhado) {
        campo.className += " sublinhado"
    }

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
}

function criarTarefa(tarefa) {
    if (!tarefa.val()) { return }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/criar",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify({
            "texto": tarefa.val(),
            "finalizado": false
        }),
        xhrFields:{
            withCredentials: true
        },
        success: (retorno) => {
            gerarLi(
                retorno.texto,
                retorno.finalizado,
                retorno.id
            )
        }
    })
}

function gerarTarefa(tarefa, sublinhado, id) {
    gerarLi(tarefa, sublinhado, id)
}

$(function () {

    //pegar cookie
    const usuario = Cookies.get("usuario");
    if (usuario) {
        const parsedUsuario = JSON.parse(usuario)
        const navLiArray = $(".navLi").toArray()
        navLiArray[1].innerText = parsedUsuario.nome
        navLiArray[2].innerText = "Sair"
        navLiArray[2].className += " botaoSair"
    }

    //LogOut
    $(".navUl").on("click", ".botaoSair", function (event) {
        Cookies.remove("usuario")
        window.location.href = "index.html"
        event.stopPropagation();
    })

    //marcar como concluida a tarefa
    $(".lista").on("click", "li", function (event) {
        $(this).find(".texto").toggleClass("sublinhado");
        event.stopPropagation();
    });

    //Apagar tarefa
    $(".lista").on("click", ".delete", function (event) {
        const idTarefa = $(this).parent().data("id");
        $.ajax({
            type: "DELETE",
            url: `http://localhost:3000/deletar/${idTarefa}`,
            dataType: "JSON",
            xhrFields:{
                withCredentials: true
            }
        }).done($(this).parent().fadeOut(function () {
            $(this).remove();
            event.stopPropagation();
        }))
        event.stopPropagation();
    });

    //Mover o elemento da lista para cima
    $(".lista").on("click", ".up", function (event) {
        const eleLista = $(this).parent();
        eleLista.prev().before(eleLista);
        event.stopPropagation();
    });

    //Mover o elemento da lista para baixo
    $(".lista").on("click", ".down", function (event) {
        const eleLista = $(this).parent();
        eleLista.next().after(eleLista);
        event.stopPropagation();
    });

    //Adicionar tarefa a lista
    $(".listaFormulario").on("submit", function (event) {
        const tarefa = $("#novaTarefa");
        criarTarefa(tarefa);
        event.stopPropagation();
    });

    //editar tarefa
    $(".lista").on("focusout", ".campEditar", function (event) {
        let formularioEditar = $(".formEditar");
        const idTarefa = $(this).parent().parent().data("id");
        const novoTexto = document.createElement("span");
        const editarValor = formularioEditar.find(".campEditar").val();

        novoTexto.className = "texto"
        novoTexto.innerText = editarValor;
        textoEditado = editarValor;

        formularioEditar.replaceWith(novoTexto);

        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/editar/${idTarefa}`,
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({
                "texto": textoEditado,
            }),
            xhrFields:{
                withCredentials: true
            }
        })

        event.stopPropagation();
    });

    $(".lista").on("click", ".edit", function (event) {
        let formularioEditar = $(".formEditar");
        if (formularioEditar.length) {
            const novoTexto = document.createElement("span");
            novoTexto.className = "texto"
            novoTexto.innerText = formularioEditar.find(".campEditar").val();
            formularioEditar.replaceWith(novoTexto);
        } else {
            const textoEditar = $(this).parent().find(".texto");
            const campoEditar = $("<input>", {
                val: $(textoEditar).text(),
                type: "text",
                class: "campEditar"
            });
            const formularioEditar = $("<form></form>", {
                onsubmit: "return false",
                class: "formEditar"
            });


            formularioEditar.append(campoEditar);
            textoEditar.replaceWith(formularioEditar);
            campoEditar.focus();
        }
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
    });
    //lista tarefas
    $.ajax({
        url: "http://localhost:3000/listar",
        type: "GET",
        dataType: "JSON",
        data: JSON.stringify({}),
        xhrFields:{
            withCredentials: true
        }
    }).done(function (res) {
        res.forEach((tarefa) => {
            gerarTarefa(
                tarefa.texto,
                tarefa.finalizado,
                tarefa.id
            )
        })
    });

    //faz o login
    $(".formLogin").on("submit", function(event){
        const usuario = $("#usuarioLogin").val();
        const senha = $("#senhaLogin").val();

        $.ajax({
            url: "http://localhost:3000/login/",
            type:"POST",
            dataType: "JSON",
            contentType: "application/json",
            xhrFields:{
                withCredentials: true
            },
            data :JSON.stringify({
                "nome": usuario,
                "senha": senha
            })
        }).success(window.location.href = "index.html")
        event.stopPropagation();
    })
    // faz o cadastro
    $(".formCadastro").on("submit", function(event){
        const usuario = $("#usuarioLogin").val()
        const senha = $("#senhaLogin").val()
        const senhaConfirmar = $("#senhaLoginConfirmar").val()
        if (
            /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{6,30}$/.test(senha) &&
            senha === senhaConfirmar &&
            /^[A-Za-z0-9]*$/.test(usuario)
        ) {
            $.ajax({
                url: "http://localhost:3000/cadastrar/",
                type:"POST",
                dataType: "JSON",
                contentType: "application/json",
                xhrFields:{
                    withCredentials: true
                },
                data :JSON.stringify({
                    "nome": usuario,
                    "senha": senha
                })
            }).success(window.location.href = "index.html")
        }
        event.stopPropagation();
    })

});
