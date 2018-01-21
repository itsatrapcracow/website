var canvas = document.getElementById('js_smoke');
var ctx = canvas.getContext('2d');

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

canvas.width = screenWidth;
canvas.height = screenHeight;


var party = smokemachine(ctx, [255, 255, 255])

party.start() // start animating

runSmoke = function() {
    setTimeout(function(){

        party.addsmoke(screenWidth*0, 0, 10, 8000, true);
    		party.addsmoke(screenWidth*0.1, 0, 10, 8000, true);
    		party.addsmoke(screenWidth*0.2, 0, 10, 8000, true);
        party.addsmoke(screenWidth*0.3, 0, 10, 8000, true);
    		party.addsmoke(screenWidth*0.4, 0, 10, 8000, true);
        party.addsmoke(screenWidth*0.5, 0, 10, 8000, true);
    		party.addsmoke(screenWidth*0.6, 0, 10, 8000, true);
        party.addsmoke(screenWidth*0.7, 0, 10, 8000, true);
    		party.addsmoke(screenWidth*0.8, 0, 10, 8000, true);
        party.addsmoke(screenWidth*0.9, 0, 10, 8000, true);
    		party.addsmoke(screenWidth, 0, 10, 8000, true);
        party.addsmoke(screenWidth*0, screenHeight+200, 10, 8000);
    		party.addsmoke(screenWidth*0.1, screenHeight+200, 10, 8000);
    		party.addsmoke(screenWidth*0.2, screenHeight+200, 10, 8000);
        party.addsmoke(screenWidth*0.3, screenHeight+200, 10, 8000);
    		party.addsmoke(screenWidth*0.4, screenHeight+200, 10, 8000);
        party.addsmoke(screenWidth*0.5, screenHeight+200, 10, 8000);
    		party.addsmoke(screenWidth*0.6, screenHeight+200, 10, 8000);
        party.addsmoke(screenWidth*0.7, screenHeight+200, 10, 8000);
    		party.addsmoke(screenWidth*0.8, screenHeight+200, 10, 8000);
        party.addsmoke(screenWidth*0.9, screenHeight+200, 10, 8000);
    		party.addsmoke(screenWidth, screenHeight+200, 10, 8000);

        runSmoke();

    },2000);
}
setTimeout(function(){
    runSmoke();
}, 3000);


// var startX = 50;
// var startY = 50;
// var endX = 100;
// var endY = 100;
// var amount = 0;
// for (var i = 1;  i < 100; i++) {
//   setTimeout(function() {
//       amount += 0.05;
//       //ctx.clearRect(100, 100, 200, 200);
//       ctx.strokeStyle = "white";
//       ctx.shadowBlur = 10;
//       ctx.shadowColor = "white";
//       ctx.moveTo(startX, startY);
//       ctx.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
//       ctx.stroke();
//   }, 10*i);
// }
