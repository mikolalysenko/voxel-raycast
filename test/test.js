
normal = [0,0,0]
position = [0,0,0]

var fakeVoxel = { getBlock: function(x,y,z) {
  return (x === 0 && y === 0 && z === 0) ||
         (x === 1 && y === 1 && z === 0)
} };

/*
  1 0 0
  0 1 0
  0 0 *
*/
console.log(require("../raycast.js")(
  fakeVoxel,
  [2,2,0.5],
  [-1,-1,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)



/*0 0 *
  1 0 0
  0 1 0
*/
console.log(require("../raycast.js")(
  fakeVoxel,
  [2,-1,0.5],
  [-1,1,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)


/*
  0 1 0
  0 0 1
  * 0 0
*/
console.log(require("../raycast.js")(
  fakeVoxel,
  [-1,2,0.5],
  [1,-1,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)


/*
  * 0 0
  0 1 0
  0 0 1
*/
console.log(require("../raycast.js")(
  fakeVoxel,
  [-1,-1,0.5],
  [1,1,0],
  10,
  position,
  normal
))
console.log(position)
console.log(normal)
