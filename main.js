Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});


camera = document.getElementById("camera");
Webcam.attach("#camera");

prediction1 = ""
prediction2 = ""


function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nNVmcJdZf/model.json',modelLoaded);



function modelLoaded(){
console.log("Model Loaded");
}



function speak(){
var synth =window.speechSynthesis;
speakdata1 = "the first prediction is "+prediction1;
speakdata2 = "and the second prediction is"+prediction2;
var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
synth.speak(utterThis);
}



function check(){
img = document.getElementById('captured_image');
classifier.classify(img, gotResult);
}


function gotResult(error,results){
if(error){
console.error(error);
}else{
console.log(results);
document.getElementById("result_name").innerHTML = results[0].label;
document.getElementById("result_name2").innerHTML = results[1].label;
prediction1=results[0].label;
prediction2=results[1].label;
speak();
if(results[0].label == "Victory")
{
    document.getElementById("update_emoji").innerHTML = "&#9996;";
}
if(results[0].label == "Dislike")
{
    document.getElementById("update_emoji").innerHTML = "&#128078;";
}
if(results[0].label == "Done/Like")
{
    document.getElementById("update_emoji").innerHTML = "&#128077;";
}

if(results[1].label == "Victory")
{
    document.getElementById("update_emoji2").innerHTML = "&#9996;";
}
if(results[1].label == "Dislike")
{
    document.getElementById("update_emoji2").innerHTML = "&#128078;";
}
if(results[1].label == "Done/Like")
{
    document.getElementById("update_emoji2").innerHTML = "&#128077;";
}
}
}