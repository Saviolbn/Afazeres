// faz o cadastro

$(function () {

    $(".formCadastro").on("submit", function (event) {
        const usuario = $("#usuarioLogin").val()
        const senha = $("#senhaLogin").val()
        const senhaConfirmar = $("#senhaLoginConfirmar").val()
        console.log(/^[A-Za-z0-9]*$/.test(usuario))
        console.log(senha === senhaConfirmar)
        console.log(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(senha))
        if (
            !(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(senha) &&
                senha === senhaConfirmar &&
                /^[A-Za-z0-9]*$/.test(usuario)
            )
        ) {
            
            alert("Usuario e/ou senha invalidos")
            return;
        }
        $.ajax({
            url: "http://localhost:3000/cadastrar/",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                "nome": usuario,
                "senha": senha
            })
        }).success(window.location.href = "index.html")
        event.stopPropagation();
    })

})

