'use strict';
{
const words =[
    'function',
    'let',
    'var',
    'const',
    'console',
    'document',
    'console.log',
    'document.write',
    'getElementById',
    'addEventListener',
    'Date.now',
    'innerText',
    'textContent',
    'innerHTML',
    'setTimeout',
    'clearTimeout',
    'cleateElement',
    'appendChild',
    'removeChild',
    'textContent',
    'random',
    'alert',
    'classList',
    'forEach',
    'checkAnswer',
    'length',
    'click',
    'window',
    'disabled',
    'while',
    'true',
    'false',
    'return',
    'use strict',
    'this',
    'Math',
    'undefined',

];



var oldnumber
let score = 0;
let miss = 0;
let point = score - miss;
let startTime;
let isPlaying = false;
let countdownTime ;
let startCountdown;
let countdownTime2 ;
let startCountdown2 ;
const timeLimit = 30000;
const title = document.getElementById('title');
const target = document.getElementById('target');
const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
const timerLabel = document.getElementById('timer');
const pointLabel = document.getElementById('point');
const start = document.getElementById('start');
const back = document.getElementById('back');
const count = document.getElementById('count');
const gameEnd = document.getElementById('gameEnd');
const lastScore = document.getElementById('lastScore');
const lastMiss = document.getElementById('lastMiss');
const lastPoint = document.getElementById('lastPoint');


const info = document.getElementById('info');
var nyuuryokumojisuu =　document.getElementById('nyuuryokumojisuu');
const misusuu = document.getElementById('misusuu');
const pointo = document.getElementById('pointo');
const nokorijikan = document.getElementById('nokorijikan');


start.addEventListener('click',()=>{
    let word = words[Math.floor(Math.random()*words.length)];
    let loc = 0;
    let oldword = word;
    let score = 0;
    let miss = 0;
    let isPlaying = true;
    title.textContent = null;
    gameEnd.textContent = null;
    lastScore.textContent = null;
    lastMiss.textContent = null;
    lastPoint.textContent = null;
    
    console.log(word);
    start.textContent = null;
    back.textContent = null;
    startCountdown = Date.now();
    countdown();

function countdown(){
    
    countdownTime = 3500 - Date.now() + startCountdown
    count.textContent = (countdownTime/1000).toFixed(0)

    
    if(500<countdownTime){
        var IterationCountdown = setTimeout(()=>{
            countdown()
        },10);
        
    }else if(-200<countdownTime && countdownTime<=500){
        count.textContent = 'GO!'
        var go = setTimeout(()=>{
            countdown()
        },10);

    }else{
        var goElse = setTimeout(()=>{
            countdown()
        },10);
        count.textContent = null
        scoreLabel.textContent = 0
        missLabel.textContent = 0
        pointLabel.textContent = 0
        isPlaying = true;
        target.textContent = word;
        console.log("a")
        startTime = Date.now()
        console.log(isPlaying);
        clearTimeout(IterationCountdown);
        clearTimeout(go);
        clearTimeout(goElse);
        
        updateTimer();
        
        
        if (isPlaying == true){
            return
        }
        

    }
}

function updateTarget(){
    
    let placeholder = ''
    for (let i= 0 ; i<loc; i++){
        placeholder += '_'
    }
    target.textContent = placeholder + word.substring(loc);
}

function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft/1000).toFixed(2);
    nyuuryokumojisuu.textContent = '入力文字数'
    misusuu.textContent = 'ミス数'
    pointo.textContent ='ポイント'
    nokorijikan.textContent = '残り時間'
    const timeoutId = setTimeout(()=>{
    updateTimer();
    },10);

    if(timeLeft<0){
        isPlaying = false;
        clearTimeout(timeoutId);
        let point = score - miss;
        timerLabel.textContent = null;
        scoreLabel.textContent = null
        missLabel.textContent = null
        pointLabel.textContent = null
        nyuuryokumojisuu.textContent = null;
        misusuu.textContent = null
        pointo.textContent =null
        nokorijikan.textContent = null
        target.textContent = null;
        loc = 0;
        startCountdown2 = Date.now();
        displayScore()
        
        function displayScore(){
        countdownTime2 = 3500 - Date.now() + startCountdown2
        
        if (2500<countdownTime2){
        var header = document.createElement('h3')
        lastScore.appendChild(header)
        
        console.log('ゲーム終了')
        gameEnd.textContent = 'ゲーム終了'
        var endGame = setTimeout(()=>{
            displayScore()
        },10);
        } else if (2000<countdownTime2 && countdownTime2<=2500){
            console.log('入力文字数'+score);
            lastScore.textContent = '入力文字数：'+score;
            var endGame = setTimeout(()=>{
                displayScore()
            },10);
        }else if(1500<countdownTime2 && countdownTime2<=2000){
            console.log('ミス数'+miss)
            lastMiss.textContent = '\n\nミス数：'+miss;
            var endGame = setTimeout(()=>{
                displayScore()
            },10);
        }else if(1000<countdownTime2 && countdownTime2<=1500){
            console.log('ゲーム終了\nポイント:');
            lastPoint.textContent = '最終得点：'+point
            
            var endGame = setTimeout(()=>{
                displayScore()
            },10)
        }else if(-1000<countdownTime2){
            start.textContent = 'START'
            back.textContent = 'BACK';
            clearTimeout(endGame)
            console.log('endGame')
        }
        }
    }
}


function newTarget(){
    
     word = words[Math.floor(Math.random()*words.length)];
     loc = 0;
    if(oldword === word){
        newTarget()
    }
    oldword = word;   
}

window.addEventListener('keydown',(e)=>{
    if(isPlaying == true){
console.log(e.key);
if (e.key===word[loc]){
    console.log('score');
    console.log(loc);
    loc++
    if (loc === word.length){
        newTarget();

        
        

    }
    updateTarget();
    score++
    let point = score - miss;
    scoreLabel.textContent= score;
    pointLabel.textContent= point;
}else if(e.keyCode==16){
    console.log('shift')
    console.log(e.keyCode)
}else if(e.keyCode!=16){
    console.log(e.keyCode)
    console.log('miss')
    console.log(word);
    console.log(loc);
    miss++
    let point = score - miss;
    missLabel.textContent = miss;
    pointLabel.textContent = point;
}
    }
});



});



}
