// Return random float between minV and maxV
function RandomInRange(minV, maxV) {
  var num = Math.random();
  return Remap(num, 0, 1, minV, maxV);
}

// Remap x from the range (in_min to in_max) to the range (out_min, out_max)
function Remap(x, in_min, in_max, out_min, out_max) {
  return out_min + (out_max - out_min) * ((x - in_min) / (in_max - in_min));
}

function Lerp(a, b, t) {
  return a + (b - a) * t;
}

function Wrap(x, a, b) {
  while(x < a) {
    x += b - a;
  }
  while(x > b) {
    x -= b -a;
  }
  return x;
}