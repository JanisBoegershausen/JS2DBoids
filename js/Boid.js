class Boid {
    constructor(pos, color) {
        this.position = pos;
        this.forward = Vector.forward;
        this.velocity = Vector.Random(1);

        this.color = color;
        this.drawSize = 5;
        
        this.speed = 2;
        this.groupRadius = 50;
        this.avoidanceRadius = 100;
    }

    Update(dt) {
        // Face the direction the boid is moving
        this.forward = this.velocity.normalized();

        // Slight random velocity changes
        this.velocity = Vector.Add(this.velocity, Vector.Random(0.1));

        // Lerp the velocity to the average of the boids around it
        this.velocity = Vector.Add(this.velocity, Vector.Scale(GetBoidsAverageVelocityInRadius(this.position, this.groupRadius), 0.1))

        // Set the velocity to move towards the center of nearby boids
        var groupCenter = GetBoidsAveragePositionInRadius(this.position, this.groupRadius);
        var directionTowardsCenter = Vector.Sub(groupCenter, this.position);
        this.velocity = Vector.Add(this.velocity, Vector.Scale(directionTowardsCenter, 0.01))

        // Avoid nearby boids
        GetBoidsInRadius(this.position, this.avoidanceRadius).forEach(b => {
            var sqrDistance = Math.max(0.01, Vector.SqrDistance(this.position, b.position));
            var directionAwayFromOther = Vector.Sub(this.position, b.position);
            this.velocity = Vector.Add(this.velocity, Vector.Scale(directionAwayFromOther, 1 / sqrDistance));
        })

        // Set the velocities magnitude to the target speed
        this.velocity = Vector.Scale(this.velocity.normalized(), this.speed);

        // Move by the velocity
        this.position = Vector.Add(this.position, Vector.Scale(this.velocity, dt));

        // Wrap the position so the boid stays on the screen
        this.position = Vector.Wrap(this.position, new Vector(0, 0), new Vector(500, 500));
    }

    // Draw this boid to the screen
    Draw() {
        // Set drawing settings
        fill(this.color.r, this.color.g, this.color.b, this.color.a);
        noStroke();

        // Calculate corners of the triangle indicating this boid
        var left = Vector.PerpendicularCounterClockwise(this.forward);
        var right = Vector.PerpendicularClockwise(this.forward)
        var backLeftCorner = Vector.Add(Vector.Sub(this.position, Vector.Scale(this.forward, this.drawSize)), Vector.Scale(left, this.drawSize));
        var backRightCorner = Vector.Add(Vector.Sub(this.position, Vector.Scale(this.forward, this.drawSize)), Vector.Scale(right, this.drawSize));
        var frontCorner = Vector.Add(this.position, Vector.Scale(this.forward, this.drawSize));

        // Draw the triangle to the screen
        triangle(
            backLeftCorner.x,
            backLeftCorner.y,
            backRightCorner.x,
            backRightCorner.y,
            frontCorner.x,
            frontCorner.y
        );
    }
}