$(document).ready(function () {
    $(".texto").on("click",function(){
        $(this).toggleClass("sublinhado")
    });

    $(".delete").on("click",function(){
        $(this).parent().remove()
    });

    $(".up").on("click",function(){
        const $elelista = ($(this).parent().parent());
        $elelista.prev().before($elelista);
    });
    $(".down").on("click",function(){
        const $elelista = ($(this).parent().parent());
        $elelista.next().after($elelista);
    });
    
});