var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var x1 = 0;
var x2 = 0;
var y1 = 0;
var y2 = 0;
var draw = false;
var color = 'black';

ctx.strokeStyle = color
ctx.lineWidth = 1;
var pixel = 0;
var state = "pencil";

canvas.addEventListener('mousedown', e => {
  if (state === "rect")
    pixel = ctx.getImageData(0, 0, 600, 600);
  x1 = e.offsetX;
  y1 = e.offsetY;

  x2 = e.offsetX;
  y2 = e.offsetY;
  draw = true;

  if (document.getElementById('black').checked) {
    ctx.lineWidth = 1;
    color = 'black';
  } else if (document.getElementById('blue').checked) {
    ctx.lineWidth = 1;
    color = 'blue';
  } else if (document.getElementById('red').checked) {
    ctx.lineWidth = 1;
    color = 'red';
  } else if (document.getElementById('eraser').checked) {
    ctx.lineWidth = 5;
    document.getElementById('eraser').checked = true;
    color = 'white';
  }
  ctx.strokeStyle = color;
});


canvas.addEventListener('mouseup', e => {
  if (state === "rect") {
    ctx.stroke();
    ctx.closePath();
  }
  draw = false;
});
canvas.addEventListener('mousemove', e => {
  if (draw == true) {
    if(state === "rect"){
      ctx.clearRect(0, 0, 600, 600);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.rect(x2, y2, e.offsetX - x2, e.offsetY - y2);
      ctx.putImageData(pixel, 0, 0);
      ctx.stroke();
      ctx.closePath();
    } else if(state === "pencil"){
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(e.offsetX, e.offsetY);
      x1 = e.offsetX;
      y1 = e.offsetY;
      ctx.stroke();
      ctx.closePath();

    }
  }
});

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 69: // button E
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 5;
      document.getElementById('eraser').checked = true;
      state = "pencil";
      break;
    case 80: // button P
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      state = "pencil";
      break;
    case 82: //button R
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      state = "rect";
      break;
  }
});
