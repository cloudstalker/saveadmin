// Hamburger Menu Actions
function menuMouseHover(){
    var lists = document.getElementsByTagName("li");
    for(var element of lists){
        if(element.style.display == "block"){
            element.style.display = "none";
        }
        else{
            element.style.display = "block";
        }
    }
}
