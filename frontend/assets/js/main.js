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
    
});
