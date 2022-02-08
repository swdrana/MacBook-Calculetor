const calculetorBody = document.getElementsByClassName('calculetor-body');
// Close Button Event 
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click',hideWindow);
function hideWindow(){
    calculetorBody[0].style.display='none';
    isMinimize = true;
}
// Minimize Button Event
let isMinimize = false;
const minBtn = document.getElementById('min-btn');
minBtn.addEventListener('click',function (){
    hideWindow();
});
//Dock/Taskbar Event
const calIcon = document.getElementById('cal-icon');
calIcon.addEventListener('click',function(){
    if(isMinimize){
        calculetorBody[0].style.display='block';
        isMinimize=true;
    }
});
//Maximize Button Event
const maxBtn = document.getElementById('max-btn');
maxBtn.addEventListener('click', function(event){
    calculetorBody[0].style.transform='rotate(45deg)';
    calculetorBody[0].style.transition='1s';
    event.stopPropagation();
});
//Body Event
const body =document.getElementsByTagName('body');
body[0].addEventListener('click', function (){
    calculetorBody[0].style.transform='rotate(0deg)';
});

/****************************************************
        Top And Dock/Taskbar area work end here  
****************************************************/