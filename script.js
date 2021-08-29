const timeQuery = document.querySelector('.time');
const startQuery = document.querySelector('.start');
const blocksQuery = document.querySelector('.blocks');
const resultQuery = document.querySelector('.result');
let time = 0;
let intervalID = NaN;
let dragStartBlock = NaN;
let dragEndBlock = NaN;

init();

//functions

function init(){
    //make image blocks
    resultQuery.style.display = 'none';
    for(let i=0; i<16; i++){
        const li = document.createElement('li');
        li.className = `image${i}`;
        li.style.backgroundPositionX = `-${100*(i%4)}px`
        li.style.backgroundPositionY = `-${100*Math.floor(i/4)}px`
        li.draggable = 'true';
        blocksQuery.append(li);
    }
}

function ClickStartButton(){
    shuffle();
    time = 0;
    timeQuery.innerText = `${time}초`;
    if(!isNaN(intervalID)){
        clearInterval(intervalID);
    }
    intervalID = setInterval(()=>{
        time++;
        timeQuery.innerText = `${time}초`;
    },1000)
}

function shuffle(){
    for(let i=blocksQuery.children.length; i>=0; i--){
        blocksQuery.appendChild(blocksQuery.children[Math.random()*i|0]);
    }
    console.log(blocksQuery);
}

function checkResult(){
    let flag = true;
    for(let i=0; i<blocksQuery.children.length; i++){
        if(`image${i}`!== blocksQuery.children[i].className){
            flag = false;
        }
    }
    if(flag){
        resultQuery.innerText = "정답입니다!";
        clearInterval(intervalID);
        resultQuery.style.display = 'block';
    } else{
        resultQuery.innerText = '아직 정답이 아닙니다....';
    }
}

//drag event handler

document.addEventListener("dragstart",function(event){
    dragStartBlock = event.target;
}, false) 
document.addEventListener("dragend",function(event){
    let startNextSibling = event.target.nextSibling;
    console.log(startNextSibling,dragEndBlock,dragStartBlock);
    blocksQuery.insertBefore(dragStartBlock,dragEndBlock);
    if(startNextSibling===dragEndBlock){
        startNextSibling = dragStartBlock;
    }
    if(startNextSibling){
        blocksQuery.insertBefore(dragEndBlock,startNextSibling);
    }
    else{
        blocksQuery.appendChild(dragEndBlock);
    }
    checkResult();
}, false)
document.addEventListener("dragleave",function(event){
    event.preventDefault();
    dragEndBlock = event.target;
}, false) 

