///////////////////Accelerometer Part////////////
var xAcc,yAcc,zAcc;
var arr_xG = [];
var arr_yG = [];
var arr_zG = [];
var arr_xAcc = [];
var arr_yAcc = [];
var arr_zAcc = [];
var arr_lbl = [];
var arr_lbl1 = [];
var obj_xAcc = {};
var obj_yAcc = {};
var obj_zAcc = {};
var obj_xG = {};
var obj_yG = {};
var obj_zG = {};
var obj = {};
var i = 0;
var count1 = 0;
var bool = true;
window.onload = function()
{
  // var startBtn = document.getElementById("btn");
  // startBtn.addEventListener("click", startreading);
  // var stopBtn = document.getElementById("btn1");
  // stopBtn.addEventListener("click", stopreading);
  // startreading();
  // stopreading();
  var startBtn = document.getElementById("btn");
  stopBtn.addEventListener("click", testbtn);
}

// function testbtn(){
//   if(bool == true){
//     start();
//     bool = false;
//   }
//   else if(bool == false) {
//     stop();
//     bool = true;
//   }
// }
function testbtn(){
  for(i = 0; i<3; j++){
    if(count1 == 1){
      start();
      count1 = 2;
    }
    else if(count1 == 2) {
      stop();
      count1 = 1;
    }
  }
}
function startreading()
{
  ///////////gyro///////
  if (window.DeviceOrientationEvent && bool == true)
  {

      window.addEventListener("deviceorientation", processGyro);
  }
  else
  {
    //console.log("DeviceMotionEvent is not supported");
    alert("DeviceOrientation is not supported");
  }

//  alert("Code worked");
  /////////////////////////Accelerometer////////////////
  if(window.DeviceMotionEvent &&  bool == true)
  {
  window.addEventListener("devicemotion", motion);
  }
  else
  {
    //console.log("DeviceMotionEvent is not supported");
    alert("DeviceMotionEvent is not supported");
  }
  console.clear();

}
//}
function processGyro(event)
  {
    if (bool == true) {
    xG =document.getElementById("alpha").innerHTML=event.alpha;
    yG =document.getElementById("beta").innerHTML=event.beta;
    zG =document.getElementById("gamma").innerHTML =event.gamma;

    arr_xG.push(xG);
    arr_yG.push(yG);
    arr_zG.push(zG);
    // console.log(arr_xG);
    }
  }

function motion(event)
  {
  if (bool == true) {
    xAcc = document.getElementById("X").innerHTML=event.accelerationIncludingGravity.x;
    yAcc = document.getElementById("Y").innerHTML=event.accelerationIncludingGravity.y;
    zAcc = document.getElementById("Z").innerHTML =event.accelerationIncludingGravity.z;


    arr_xAcc.push(xAcc);
    arr_yAcc.push(yAcc);
    arr_zAcc.push(zAcc);
    }
  }
  function stopreading()
  {
    bool = false;
    document.getElementById("alpha").innerHTML="";
    document.getElementById("beta").innerHTML="";
    document.getElementById("gamma").innerHTML ="";
    document.getElementById("X").innerHTML="";
    document.getElementById("Y").innerHTML="";
    document.getElementById("Z").innerHTML ="";
    for(i=0;i<arr_xAcc.length;i++)
    {
      arr_lbl.push(i);
    }
    for(i=0;i<arr_xG.length;i++)
    {
      arr_lbl1.push(i);
    }
    arr_xAcc.forEach(function(value, idx) {
      obj_xAcc[idx] = value
    });
    //console.log("arr_xAcc: ",obj)
    arr_yAcc.forEach(function(value, idx) {
      obj_yAcc[idx] = value
    });
    arr_zAcc.forEach(function(value, idx) {
      obj_zAcc[idx] = value
    });
    arr_xG.forEach(function(value, idx) {
      obj_xG[idx] = value
    });
    arr_yG.forEach(function(value, idx) {
      obj_yG[idx] = value
    });
    arr_zG.forEach(function(value, idx) {
      obj_zG[idx] = value
    });
    obj['xG'] = obj_xG;
    obj['yG'] = obj_yG;
    obj['zG'] = obj_zG;
    obj['xAcc'] = obj_xAcc;
    obj['yAcc'] = obj_yAcc;
    obj['zAcc'] = obj_zAcc;
    obj['lbl'] = arr_lbl;
    obj['lbl1'] = arr_lbl1;
    //console.log(obj);
    send_acc();
  }
  function send_acc(){
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://172.16.67.60:8891/sensordata");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(obj));
  }
