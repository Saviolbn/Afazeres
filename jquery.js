$(document).ready(function () {
    $(".texto").on("click",function(){
        $(this).toggleClass("sublinhado")
    });

    $(".delete").on("click",function(){
        $(this).parent().remove()
    });

    $(".up").on("click",function(){
        var $esse = ($(this).parent().parent());
        $esse.prev().before($esse);
    });
    $(".down").on("click",function(){
        var $esse = ($(this).parent().parent());
        $esse.next().after($esse);
    });
    
});