document.getElementById("myCheckbox").addEventListener("change", switchMode);
function applyDark(){
    $("#wrapper").addClass("wrapper_dark");
    $("#wrapper").removeClass("wrapper_light");

    $("textarea").addClass("text_dark_mode");
    $("footer").addClass("footer_dark");
}
