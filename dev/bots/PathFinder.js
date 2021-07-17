import Vector from '../util/Vector.js';

class PathFinder {
	body = null;
	target = null;
	distance = Infinity;
	direction = null;
	angle = null;

	constructor ( body ) {
		this.body = body;
	}

	scan () {
		this.target = null;
		this.distance = Infinity;

		Object.keys( window.canvas.unitLayer ).map( ( item ) => {
			let target = window.canvas.unitLayer[ item ];
			let distance = Math.sqrt( Math.pow( target.x - this.body.x, 2 ) + Math.pow( target.y - this.body.y, 2 ) );

			if ( this.body !== target && target.fraction && this.body.fraction !== target.fraction && target.alive && distance < this.distance ) {
				this.distance = distance;
				this.target = target;
			}
		});
	}

	calculate () {
		this.direction = new Vector({ x: this.target.x - this.body.x, y: this.target.y - this.body.y });
		this.distance = this.direction.length();
		// this.angle = Math.acos(
		// 	( ( this.direction.x * this.body.d.x ) + ( this.direction.y * this.body.d.y ) ) /
		// 	( this.direction.length() * this.body.d.length() )
		// );
		this.angle =
			Math.atan2( this.body.d.x, this.body.d.y ) -
			Math.atan2( this.direction.x, this.direction.y ) ;
	}

	rotate () {
		if ( this.angle < 0 && this.angle > - Math.PI ) {
			this.body.rotateLeft();
		} else if ( this.angle < 0 && this.angle < - Math.PI ) {
			this.body.rotateRight();
		} else if ( this.angle > 0 && this.angle < Math.PI ) {
			this.body.rotateRight();
		} else if ( this.angle > 0 && this.angle > Math.PI ) {
			this.body.rotateLeft();
		}
	}

	move () {
		if ( this.distance > 200 ) {
			this.body.moveForward();
		} else if ( this.distance < 100 ) {
			this.body.moveBackward();
		} else {
			this.body.moveLeft();
		}
	}

	attack () {
		if ( this.distance < 300 ) {
			this.body.shot();
		}
	}

	act () {
		this.scan();

		if ( this.target && this.target.alive ) {
			this.calculate();
			this.rotate();
			this.move();
			// this.attack();
		}
	}

	info () {
		return {
			target: this.target && this.target.type,
			direction: this.direction,
			distance: this.distance,
			angle: this.angle
		};
	}
}

export default PathFinder;
