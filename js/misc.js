document.getElementById("myCheckbox").addEventListener("change", switchMode);
function applyDark(){
    $("#wrapper").addClass("wrapper_dark");
    $("#wrapper").removeClass("wrapper_light");

    $("textarea").addClass("text_dark_mode");
    $("footer").addClass("footer_dark");
}

function applyLight(){
    $("#wrapper").addClass("wrapper_light");
    $("#wrapper").removeClass("wrapper_dark");
    $("textarea").removeClass("text_dark_mode");
    $("footer").removeClass("footer_dark");
}
