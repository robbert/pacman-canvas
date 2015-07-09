/**
 * @constructor
 * @param {function(number):number} easing
 * @param {number} duration milliseconds
 * @param {number} last
 * @param {number} direction
 */
function Animation(easing, duration, last, direction)
{
	this.easing = easing;
	this.direction = 1; // 1 or -1
	this.direction = direction;
	this.duration = duration;
	this.delay = 0;
	this.progress = 0; // 0.0 - 1.0
	this.startTime = null;
	this.iteration = 0;
	this.last = last || Infinity;
}

/** @type {number} Similar to the `playbackRate` property of Media elements */
Animation.prototype.direction = 1;

/** @type {number} milliseconds */
Animation.prototype.delay = 0;

/** @type {number} milliseconds */
Animation.prototype.startTime = 0;

/** @type {number} current iteration */
Animation.prototype.iteration = 0;

/** @type {number} last iteration */
Animation.prototype.last = 0;

/** @type {number} */
Animation.prototype.started = false;

/** @type {number} */
Animation.prototype.ended = false;

/** @type {number} */
Animation.prototype.evenDirection = 1;

/** @type {number} */
Animation.prototype.oddDirection = 1;

/** @type {number} */
Animation.prototype.position = 0;

Animation.prototype.restart = function ()
{
	this.progress = 0;
	this.iteration = 0;
	this.start();
	this.started = false;
	this.ended = false;
};

/**
 * @param {number} timeStamp milliseconds
 */
Animation.prototype.start = function (timeStamp)
{
	this.start = timeStamp;
	this.started = true;
	this.iteration = 1;
};

Animation.prototype.pause = function ()
{
	this.start = null;
};
Animation.prototype.resume = function ()
{
	this.start = timeStamp;
};

/**
 * @param {number} timeStamp milliseconds
 * @return {number}
 */
Animation.prototype.tick = function (timeStamp)
{
	if (!(timeStamp >= this.startTime))
		// return;
		throw new TypeError(this.startTime + " < " + timeStamp);

	var progress = (timeStamp - this.startTime);

	this.position = progress / this.duration;
	this.iteration = Math.abs(Math.floor(this.position));

	var isOdd = (this.position & 1) !== 0;

	if (isOdd)
		this.position *= this.oddDirection;
	else
		this.position *= this.evenDirection;

	if (this.position >= 1)
	{
		// TODO: Or loop, and don't end yet
		if (this.iteration >= this.last)
		{
			this.ended = true;
		}
	}
	return this.position = this.easing(this.position - Math.floor(this.position))
};

/**
 * @enum
 * @type {Array.<string>}
 */
Animation.DIRECTION = [
	"normal",
	"alternate",
	"alternate-reverse"
];

/**
 * @param {Animation.DIRECTION} x
 */
Animation.prototype.setDirection = function (x)
{
	var odd = 1,
		even = 1;

	if (x === "alternate-reverse")
	{
		odd = -1;
	}
	else if (x === "reverse")
	{
		even = -1
		odd = -1;
	}
	else if (x === "normal")
	{
		//
	}
	else
	{
		throw new TypeError;
	}
	this.oddDirection = odd;
	this.evenDirection = even;
};
