// Hamburger Menu Actions
function menuClicked(){
    var lists = document.getElementsByTagName("li");
    for(var element of lists){
        if(element.style.display == "block"){
            element.style.display = "none";
            $("#menuButtonImg").rotate({
                angle: 90,
                animateTo: 0,
                duration: 200
            });
        }
        else{
            element.style.display = "block";
            $("#menuButtonImg").rotate({
                angle: 0,
                animateTo: 90,
                duration: 200
            });
        }
    }
}

function checkSize(){
    if(document.body.clientWidth > 600){
        var lists = document.getElementsByTagName("li");
        for(var element of lists){
            element.style.display = "block";
            $("#menuButtonImg").rotate(0);
        }
    }
    else{
        var lists = document.getElementsByTagName("li");
        for(var element of lists){
            element.style.display = "none";
        }
    }
}