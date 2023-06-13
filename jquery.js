$(document).ready(function () {
    $("li").on("click",function(){
        $(this).find(".texto").css("text-decoration","line-through")
    });
});