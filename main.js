var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var click = false

var usingEraser = false

var lastPoint = { x: undefined, y: undefined }

autoSetCanvas()

eraserUnable()

chooseColors()

chooseLineSize()

if (document.body.ontouchstart !== undefined) {
  listenToTouch()
} else {
  listenToMouse()
}

deleteEvents()

downloadDraw()

function setCanvasSize() {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}

function autoSetCanvas() {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }
}


function eraserUnable(){
  pen.onclick = function () {
    console.log()
    usingEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
  }
  eraser.onclick = function () {
    usingEraser = true
    pen.classList.remove('active')
    eraser.classList.add('active')
  }
}

function chooseColors(){
  black.onclick = function(){
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
  }
  red.onclick = function(){
    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
  }
  blue.onclick = function(){
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.add('active')
    green.classList.remove('active')
  }
  green.onclick = function(){
    ctx.strokeStyle = 'green'
    ctx.fillStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.add('active')
  }
}

function chooseLineSize(){
  ctx.lineWidth = 5
  more.onclick = function(){
    ctx.lineWidth = 5
    less.classList.remove('active')
    normal.classList.remove('active')
    more.classList.add('active')
    greatMore.classList.remove('active')
  }
  less.onclick = function(){
    ctx.lineWidth = 1
    less.classList.add('active')
    normal.classList.remove('active')
    more.classList.remove('active')
    greatMore.classList.remove('active')
  }
  normal.onclick = function(){
    ctx.lineWidth = 3
    less.classList.remove('active')
    normal.classList.add('active')
    more.classList.remove('active')
    greatMore.classList.remove('active')
  }
  greatMore.onclick = function(){
    ctx.lineWidth = 8
    less.classList.remove('active')
    normal.classList.remove('active')
    more.classList.remove('active')
    greatMore.classList.add('active')
  }
}

function drawCircle(x, y, radius) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
}

function listenToMouse() {
  canvas.onmousedown = function (a) {
    var x = a.clientX
    var y = a.clientY
    click = true
    if (usingEraser) {
      ctx.clearRect(x, y, 10, 10)
    } else {
      drawCircle(x, y, 1)
      lastPoint = { "x": x, "y": y }
    }
  }
  canvas.onmousemove = function (a) {
    x = a.clientX
    y = a.clientY
    if (click) {
      if (usingEraser) {
        ctx.clearRect(x, y, 10, 10)
      } else {
        var newPoint = { "x": x, "y": y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
  }
  canvas.onmouseup = function (a) {
    click = false
  }
}

function listenToTouch() {
  canvas.ontouchstart = function (a) {
    console.log(a)
    var x = a.touches[0].clientX
    var y = a.touches[0].clientY
    click = true
    if (usingEraser) {
      ctx.clearRect(x, y, 10, 10)
    } else {
      drawCircle(x, y, 1)
      lastPoint = { "x": x, "y": y }
    }
  }
  canvas.ontouchmove = function (a) {
    x = a.touches[0].clientX
    y = a.touches[0].clientY
    if (click) {
      if (usingEraser) {
        ctx.clearRect(x, y, 10, 10)
      } else {
        var newPoint = { "x": x, "y": y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
  }
  canvas.ontouchend = function (a) {
    click = false
  }
}
function deleteEvents(){
  clear.onclick = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}
function downloadDraw(){
  download.onclick = function(){
    var url = canvas.toDataURL("img/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target = '_blank'
    a.click()
  }
}
