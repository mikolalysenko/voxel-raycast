"use strict";

var scratch_norm = new Float32Array(3);
var scratch_pos  = new Float32Array(3);

//Voxel ray marching code, ported from an old project
function traceRay(voxels, origin, direction, max_d, hit_pos, norm) {
  var ox = origin[0]
    , oy = origin[1]
    , oz = origin[2]
    , dx = direction[0]
    , dy = direction[1]
    , dz = direction[2]
    , ds = Math.sqrt(dx*dx + dy*dy + dz*dz)
    , norm_axis = 0;
  dx /= ds;
  dy /= ds;
  dz /= ds;

  if(!max_d) {
    max_d = 64.0;
  }
  if(!hit_pos) {
    hit_pos = scratch_pos;
  }
  if(!norm) {
    norm = scratch_norm;
  }

  //Step block-by-block along ray
  var t = 0.0;
  while(t <= max_d) {
    var ix = Math.floor(ox)
      , iy = Math.floor(oy)
      , iz = Math.floor(oz);
  
    var b = voxels.getBlock(ix, iy, iz);
    if(b != 0) {
      hit_pos[0] = ox;
      hit_pos[1] = oy;
      hit_pos[2] = oz;
      norm[0] = norm[1] = norm[2] = 0;
      if(norm_axis > 0) {
        norm[norm_axis-1] = 1;
      } else if(norm_axis < 0) {
        norm[-1-norm_axis] = -1;
      }
      return b;
    }
    
    var step = 0.5;
    
    var fx = ox - ix;
    var fy = oy - iy;
    var fz = oz - iz;
    
    if(dx < -0.0001) {
      if(fx < 0.0001)
        fx = 1.0;
      var s = -fx/dx;
      if(s < step) {
        norm_axis = 1;
        step = s;
      }
    }
    if(dx > 0.0001) {
      var s = (1.0-fx)/dx;
      if(s < step) {
        norm_axis = -1;
        step = s;
      }
    }
    
    if(dy < -0.0001) {
      if(fy < 0.0001)
        fy = 1.0;
      var s = -fy/dy;
      if(s < step) {
        norm_axis = 2;
        step = s;
      }
    }
    if(dy > 0.0001) {
      var s = (1.0-fy)/dy;
      if(s < step) {
        norm_axis = -2;
        step = s;
      }
    }
    
    if(dz < -0.0001) {
      if(fz < 0.0001)
        fz = 1.0;
      var s = -fz/dz;
      if(s < step) {
        norm_axis = 3;
        step = s;
      }
    }
    if(dz > 0.0001) {
      var s = (1.0-fz)/dz;
      if(s < step) {
        norm_axis = -3;
        step = s;
      }
    }
    t += step;
    ox += dx * step;
    oy += dy * step;
    oz += dz * step;
  }
  return -1;
}

module.exports = traceRay;