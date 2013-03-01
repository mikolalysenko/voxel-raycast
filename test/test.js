
normal = [0,0,0]
position = [0,0,0]

var fakeVoxel = { getBlock: function(x,y,z) { return x === 50 && y === 50 && z === 50; } };

console.log(require("../raycast.js")(
  fakeVoxel,
  [50,45,50],
  [0,1,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)

console.log(require("../raycast.js")(
  fakeVoxel,
  [50,50 - 1e-12,50],
  [0,1,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)




console.log(require("../raycast.js")(
  fakeVoxel,
  [50,55,50],
  [0,-1,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)

console.log(require("../raycast.js")(
  fakeVoxel,
  [45,50,50],
  [1,0,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)

console.log(require("../raycast.js")(
  fakeVoxel,
  [55,50.5,50.5],
  [-1,0,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)

console.log(require("../raycast.js")(
  fakeVoxel,
  [45,45,50],
  [1,1,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)



console.log(require("../raycast.js")(
  fakeVoxel,
  [45,56,45],
  [1,-1,1],
  100,
  position,
  normal
))
console.log(position)
console.log(normal)

