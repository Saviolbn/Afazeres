$(document).ready(function () {
    $("li").on("click",function(){
        $(this).find(".texto").toggleClass("sublinhado")
    })
});