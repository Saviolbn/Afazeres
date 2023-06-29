//faz o login

$(function(){

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

})
