import { Injectable } from '@nestjs/common';

interface vector {
  x: number;
  y: number;
  z: number;
  r: number;
}
@Injectable()
export class TrilaterationService {
  /**
   * based on: https://github.com/gheja/trilateration.js/blob/master/trilateration.js
   *
   */

  /**
   * Calculates the coordinates of a point in 3D space from three known points
   * and the distances between those points and the point in question.
   *
   * If no solution found then null will be returned.
   *
   * If two solutions found then both will be returned, unless the fourth
   * parameter (return_middle) is set to true when the middle of the two solution
   * will be returned.
   *
   * @param {Object} p1 Point and distance: { x, y, z, r }
   * @param {Object} p2 Point and distance: { x, y, z, r }
   * @param {Object} p3 Point and distance: { x, y, z, r }
   * @param {bool} return_middle If two solution found then return the center of them
   * @return {Object|Array|null} { x, y, z } or [ { x, y, z }, { x, y, z } ] or null
   */

  public vector(x: number, y: number, z: number | null, r: number): vector {
    return {
      x,
      y,
      z: z ? z : 0,
      r,
    };
  }
  public trilaterate(
    p1: vector,
    p2: vector,
    p3: vector,
    return_middle: boolean,
  ): Array<number> {
    try {
      console.log('Trilateration ', [p1, p2, p3, return_middle]);
      const ex = this.vector_divide(
        this.vector_subtract(p2, p1),
        this.norm(this.vector_subtract(p2, p1)),
      );

      const i = this.dot(ex, this.vector_subtract(p3, p1));
      let a = this.vector_subtract(
        this.vector_subtract(p3, p1),
        this.vector_multiply(ex, i),
      );
      const ey = this.vector_divide(a, this.norm(a));
      const ez = this.vector_cross(ex, ey);
      const d = this.norm(this.vector_subtract(p2, p1));
      const j = this.dot(ey, this.vector_subtract(p3, p1));

      const x = (this.sqr(p1.r) - this.sqr(p2.r) + this.sqr(d)) / (2 * d);
      const y =
        (this.sqr(p1.r) - this.sqr(p3.r) + this.sqr(i) + this.sqr(j)) /
          (2 * j) -
        (i / j) * x;

      let b = this.sqr(p1.r) - this.sqr(x) - this.sqr(y);

      // floating point math flaw in IEEE 754 standard
      // see https://github.com/gheja/trilateration.js/issues/2
      if (Math.abs(b) < 0.0000000001) {
        b = 0;
      }

      const z = Math.sqrt(b);

      // no solution found
      if (isNaN(z)) {
        return null;
      }

      a = this.vector_add(
        p1,
        this.vector_add(
          this.vector_multiply(ex, x),
          this.vector_multiply(ey, y),
        ),
      );
      const p4a = this.vector_add(a, this.vector_multiply(ez, z));
      const p4b = this.vector_subtract(a, this.vector_multiply(ez, z));

      if (z == 0 || return_middle) {
        return [a.x, a.y];
      } else {
        return [p4a, p4b];
      }
    } catch (error) {
      console.error('TRILATERATION FAILS %o', error);
      return null;
    }
  }

  // some additional local functions declared here for
  // scalar and vector operations

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  private sqr(a) {
    //console.log('sqr', a * a);
    return a * a;
  }

  private norm(a) {
    return Math.sqrt(this.sqr(a.x) + this.sqr(a.y) + this.sqr(a.z));
  }

  private dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  private vector_subtract(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z,
    };
  }

  private vector_add(a, b): any {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z,
    };
  }

  private vector_divide(a, b) {
    return {
      x: a.x / b,
      y: a.y / b,
      z: a.z / b,
    };
  }

  private vector_multiply(a, b) {
    return {
      x: a.x * b,
      y: a.y * b,
      z: a.z * b,
    };
  }

  private vector_cross(a, b) {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x,
    };
  }
}
