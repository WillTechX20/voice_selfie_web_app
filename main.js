var speechRecognition=webkitSpeechRecognition;
var newSpeechRecogniton=new speechRecognition();
var resultTextarea=document.querySelector('textarea');
var cameraVideo=document.querySelector('#camera');

function start(){
    resultTextarea.innerText='';
    newSpeechRecogniton.start();

    newSpeechRecogniton.onresult=function(eventVar){
        console.log(eventVar);

        var resultStr=eventVar.results[0][0].transcript;

        console.log(resultStr);
        resultTextarea.innerText=resultStr;

        if(resultStr=='take my selfie'){
            console.log('Taking selfie...');
            speak();
        }
        
    };
}

function takeSnapshot(){
    Webcam.snap(function(dataURIStr){
        document.querySelector('#selfie').innerHTML='<img id="selfie_img" src="'+dataURIStr+'">';
    });
}

function saveSnapshot(){
    var a=document.querySelector('a');
    var selfieImgURLStr=document.querySelector('#selfie_img').src;

    a.href=selfieImgURLStr;
    a.click();
}

function speak(){
    var newSpeechSynthesis=window.speechSynthesis;
    var speechStr='Taking your selfie in 5 seconds!';
    var i=new SpeechSynthesisUtterance(speechStr); 

    newSpeechSynthesis.speak(i);
    Webcam.attach(cameraVideo);
    setTimeout(function(){
        takeSnapshot();
        saveSnapshot();
    }, 5000);
}

Webcam.set({width: 360, height: 250, image_format: 'png', png_quality: 90});

