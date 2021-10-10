class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static forward = new Vector(1, 0);
  static zero = new Vector(0, 0);

  normalized() {
    var m = this.mag();
    return new Vector(this.x / m, this.y / m);
  }

  mag() {
    return Math.sqrt(this.sqrmag());
  }

  sqrmag() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  static Add(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
  }

  static AddFloat(a, f) {
    return new Vector(a.x + f, a.y + f);
  }

  static Sub(a, b) {
    return new Vector(a.x - b.x, a.y - b.y);
  }

  static Mult(a, b) {
    return new Vector(a.x * b.x, a.y * b.y);
  }

  static Div(a, b) {
    return new Vector(a.x / b.x, a.y / b.y);
  }

  static Scale(a, s) {
    return new Vector(a.x * s, a.y * s);
  }

  static PerpendicularClockwise(v) {
    return new Vector(v.y, -v.x)
  }

  static PerpendicularCounterClockwise(v) {
    return new Vector(-v.y, v.x)
  }

  static Dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  // Reflects the given direction on a plane with the given normal and returns the new direction
  static Reflect(inDirection, normal) {
    inDirection = inDirection.normalized();
    normal = normal.normalized();
    return Vector.Sub(inDirection, Vector.Scale(normal, Vector.Dot(inDirection, normal) * 2)).normalized();
  }

  static Wrap(v, minV, maxV) {
    return new Vector(
      Wrap(v.x, minV.x, maxV.x),
      Wrap(v.y, minV.y, maxV.y)
    );
  }

  // Returns a random vector with the given magnitude
  static Random(magnitude) {
    return Vector.Scale(new Vector(RandomInRange(-1, 1), RandomInRange(-1, 1)).normalized(), magnitude);
  }

  static Clamp(vector, maxMag) {
    if(vector.mag() > maxMag) {
      return Vector.Scale(vector.normalized(), maxMag);
    } else {
      return vector;
    }
  }

  static Distance(a, b) {
    return Vector.Sub(a, b).mag();
  }

  static SqrDistance(a, b) {
    return Vector.Sub(a, b).sqrmag();
  }
}
