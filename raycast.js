"use strict"

var EPSILON = 1e-8

function traceRay(voxels, origin, direction, max_d, hit_pos, hit_norm) {
  var ox = origin[0]
    , oy = origin[1]
    , oz = origin[2]
    , dx = direction[0]
    , dy = direction[1]
    , dz = direction[2]
    , ds = Math.sqrt(dx*dx + dy*dy + dz*dz)
    , norm_axis = 0
    , t = 0.0
    , ix, iy, iz, fx, fy, fz, ox, oy, oz, b, step
  dx /= ds
  dy /= ds
  dz /= ds
  if(typeof(max_d) === "undefined") {
    max_d = 64.0
  }
  //Step block-by-block along ray
  while(t <= max_d) {
    ix = Math.floor(ox)
    iy = Math.floor(oy)
    iz = Math.floor(oz)
    fx = ox - ix
    fy = oy - iy
    fz = oz - iz
    b = voxels.getBlock(ix, iy, iz)
    if(b != 0) {
      if(hit_pos) {
        //Clamp to face on hit
        hit_pos[0] = fx < EPSILON ? +ix : (fx > 1.0-EPSILON ? ix+1.0-EPSILON : ox)
        hit_pos[1] = fy < EPSILON ? +iy : (fy > 1.0-EPSILON ? iy+1.0-EPSILON : oy)
        hit_pos[2] = fz < EPSILON ? +iz : (fz > 1.0-EPSILON ? iz+1.0-EPSILON : oz)
      }
      if(hit_norm) {
        hit_norm[0] = hit_norm[1] = hit_norm[2] = 0
        if(norm_axis < 0) {
          hit_norm[-norm_axis-1] = -1
        } else if(norm_axis > 0) {
          hit_norm[norm_axis-1] = 1
        }
      }
      return b
    }
    //Walk to next face of cube along ray
    step = 2.0
    if(dx < -EPSILON) {
      var s = -fx/dx
      if(s < step) {
        norm_axis = 1
        step = s
      }
    }
    if(dx > EPSILON) {
      var s = (1.0-fx)/dx
      if(s < step) {
        norm_axis = -1
        step = s
      }
    }
    if(dy < -EPSILON) {
      var s = -fy/dy
      if(s < step) {
        norm_axis = 2
        step = s
      }
    }
    if(dy > EPSILON) {
      var s = (1.0-fy)/dy
      if(s < step) {
        norm_axis = -2
        step = s
      }
    }
    if(dz < -EPSILON) {
      var s = -fz/dz
      if(s < step) {
        norm_axis = 3
        step = s
      }
    }
    if(dz > EPSILON) {
      var s = (1.0-fz)/dz
      if(s < step) {
        norm_axis = -3
        step = s
      }
    }
    if(step > max_d - t) {
      step = max_d - t + EPSILON;
    }
    if(step < EPSILON) {
      step = EPSILON
    }
    t += step
    ox += dx * step
    oy += dy * step
    oz += dz * step
  }
  return -1
}

module.exports = traceRay