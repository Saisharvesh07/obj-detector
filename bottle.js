img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('bottle.jpeg');

}

function draw() {
    image(img, 0, 0, 420, 640);

    if(status !="")
    {
    r = random(225);
    g = random(225);
    b = random(225);
    objectDetector.detect(img, gotResult);
     for(i = 0; i < objects.length; i++)   
     {
       document.getElementById("status").innerHTML = "Status : Object Detected";
       document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+objects.length;

       fill("#FF0000");
       percent = floor(objects[i].confidence * 100);
       text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15);
       noFill();
       stroke("#FF0000");
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

     }
    }
}  

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
