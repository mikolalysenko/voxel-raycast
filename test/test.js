
normal = [0,0,0]
position = [0,0,0]

console.log(require("../raycast.js")(
  { getBlock: function(x,y,z) { return x === 50 && y === 50 && z === 50; } },
  [50,45,50],
  [0,1,0],
  10,
  position,
  normal
))

console.log(position)
console.log(normal)
