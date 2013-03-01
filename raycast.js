"use strict";

var EPSILON = 1e-6

//Voxel ray marching code, ported from an old project
function traceRay(voxels, origin, direction, max_d, hit_pos, hit_norm) {
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
  
  //Step block-by-block along ray
  var t = 0.0;
  while(t <= max_d) {
    var ix = Math.floor(ox)
      , iy = Math.floor(oy)
      , iz = Math.floor(oz)
      , fx = ox - ix
      , fy = oy - iy
      , fz = oz - iz;
    var b = voxels.getBlock(ix, iy, iz);
    if(b != 0) {
      if(hit_pos) {
        hit_pos[0] = ox;
        hit_pos[1] = oy;
        hit_pos[2] = oz;
        //Check if collision intersects open interval
        if(Math.max(fx, fy, fz) > 1.0 - 9.0 * EPSILON) {
          hit_pos[0] -= 0.5 * EPSILON * dx;
          hit_pos[1] -= 0.5 * EPSILON * dy;
          hit_pos[2] -= 0.5 * EPSILON * dz;
        } else {
          hit_pos[0] -= EPSILON * dx;
          hit_pos[1] -= EPSILON * dy;
          hit_pos[2] -= EPSILON * dz;
        }
      }
      if(hit_norm) {
        hit_norm[0] = hit_norm[1] = hit_norm[2] = 0;
        if(norm_axis < 0) {
          hit_norm[-norm_axis-1] = -1;
        } else if(norm_axis > 0) {
          hit_norm[norm_axis-1] = 1;
        }
      }
      return b;
    }
    var step = 2.0;
    if(dx < -EPSILON) {
      if(fx < EPSILON)
        fx = 1.0;
      var s = -fx/dx;
      if(s < step) {
        norm_axis = 1;
        step = s;
      }
    }
    if(dx > EPSILON) {
      var s = (1.0-fx)/dx;
      if(s < step) {
        norm_axis = -1;
        step = s;
      }
    }
    if(dy < -EPSILON) {
      if(fy < EPSILON)
        fy = 1.0;
      var s = -fy/dy;
      if(s < step) {
        norm_axis = 2;
        step = s;
      }
    }
    if(dy > EPSILON) {
      var s = (1.0-fy)/dy;
      if(s < step) {
        norm_axis = -2;
        step = s;
      }
    }
    if(dz < -EPSILON) {
      if(fz < EPSILON)
        fz = 1.0;
      var s = -fz/dz;
      if(s < step) {
        norm_axis = 3;
        step = s;
      }
    }
    if(dz > EPSILON) {
      var s = (1.0-fz)/dz;
      if(s < step) {
        norm_axis = -3;
        step = s;
      }
    }
    if(t === 0.0) {
      step = EPSILON;
    } else {
      step = Math.min(step, 1.0) + EPSILON
    }    
    t += step;
    ox += dx * step;
    oy += dy * step;
    oz += dz * step;
  }
  return -1;
}

module.exports = traceRay;