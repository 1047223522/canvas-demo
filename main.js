var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var click = false

var usingEraser = false

var lastPoint = {x:undefined,y:undefined}

autoSetCanvas()

eraserUnable()

listenToMouse()

function setCanvasSize(){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}

function autoSetCanvas(){
  setCanvasSize()
  window.onresize = function(){
    setCanvasSize()
  }
}

function drawCircle(x,y,radius){
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI*2)
  ctx.fill()
}
function drawLine(x1,y1,x2,y2){
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.lineWidth = 5
  ctx.stroke()
  ctx.closePath()
}

function listenToMouse(){
    canvas.onmousedown = function(a){
        var x = a.clientX
        var y = a.clientY
        click = true 
        if(usingEraser){
          ctx.clearRect(x,y,10,10)
        }else{
          drawCircle(x,y,1)
          lastPoint = {"x":x,"y":y} 
        }
    }
    canvas.onmousemove = function(a){
        x = a.clientX
        y = a.clientY
        if(click){
          if(usingEraser){
            ctx.clearRect(x,y,10,10)
          }else{
            var newPoint = {"x":x,"y":y}
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
          }
        }
    }        
    canvas.onmouseup = function(a){
        click = false
    }
}

function eraserUnable(){
    eraser.onclick = function(){
        usingEraser = true
        actions.className = actions.x
    }
    brush.onclick = function(){
        usingEraser = false
        actions.className = actions
    }
}