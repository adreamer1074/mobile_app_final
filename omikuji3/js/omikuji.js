"use strict";


window.addEventListener("DOMContentLoaded", function () {
    $("header").textillate({
        loop: false,
        minDisplayTime: 2000,
        initialDelay: 2000,
        autoStart: true,
        in: {
            effect: "fadeInLeftBig",
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: true
        }
    });
    // おみくじボタン(id="btn1") ボヤァと表示させる
    $(function () {
        ScrollReveal().reveal("#btn1", { duration: 9000 });
    });
    setTimeout(
        function () {
            let popMessage = "いらっしゃい!おみくじ引いてって!";
            window.alert(popMessage);
        },
        "5000"
    );
}, false);

let soundEndflag = "0";
const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage");

btn1.addEventListener("click",
 function () {
    if (soundEndflag === "1") {
        soundControl("end", "");
    }
    let resultText = ["img/daikichi.png","img/chukichi.png","img/syokichi.png","img/suekichi.png","img/daikyo.png",]
    let resultsMaxSpeed = [10,10,8,5,5];
    let resultMaxSize = [40,30,30,30,40]
    let resultImage = ["img/star.png", "img/sakura_hanabira.png", "img/sakura_hanabira.png",
        "img/sakura_hanabira.png", "img/leaf.png", "img/IMG_1425.JPG"];
    let resultSound = ["sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3","sound/omikuji_sound4.mp3",
    "sound/omikuji_sound5.mp3",]
    let n = Math.floor(Math.random() * resultText.length);

    omikujiTextImage.src = resultText[n];
    omikujiTextImage.classList.add("omikujiPaper");
    omikujiTextImage.addEventListener("animationend",
    function(){
        omikujiTextImage.classList.remove("omikujiPaper");
    }, false
    );

    //soundControl
    w_sound = resultSound[n]
    soundControl("start", w_sound);
    soundEndflag = "1";


    // snowfall stop
    $(document).snowfall("clear");
            // jQueryのsnowfall
            $(document).ready(function () {
                $(document).snowfall({
                    maxSpeed: resultsMaxSpeed[n],
                    maxSize: resultMaxSize[n],
                    image: resultImage[n],
                });
            });
        }, false
    );

//soundcontrol
let w_sound
let music
function soundControl(status,w_sound){
    if(status ==="start"){
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    }else if (status ==="end"){
        music.pause();
        music.currentTime=0;
    }
}
