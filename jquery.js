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
    
});