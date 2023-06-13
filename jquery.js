$(document).ready(function () {
    $(".texto").on("click",function(){
        $(this).toggleClass("sublinhado")
    });

    $(".delete").on("click",function(){
        $(this).parent(this).hide()
    });
});