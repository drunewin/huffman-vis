class Player {
  constructor(callback, index, interval) {
    this.iteration = callback;
    this.index = index || 0;
    this.timer = null;
    this.interval = interval || 500;
    this.ended = false;
  }

  play() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        if (this.ended) {
          this.pause();
        } else {
          this.ended = this.iteration(this.index++);
        }
      }, this.interval);
    }
  }

  stepForward() {
    if (!this.ended) {
      this.pause();
      this.ended = this.iteration(this.index++);
    }
  }

  stepBack() {
    if (this.index > -1) {
      this.pause();
      this.ended = this.iteration(--this.index);
    }
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  slowDown(value) {
    if (this.interval === 1000) {
      return Math.floor(1000 / this.interval);
    }
    this.interval = Math.floor(this.interval * value);
    if (this.interval > 1000) {
      this.interval = 1000;
    }
    if (this.timer) {
      this.pause();
      this.play();
    }
    return Math.floor(1000 / this.interval);
  }

  speedUp(value) {
    if (this.interval === 10) {
      return Math.floor(1000 / this.interval);
    }
    this.interval = Math.floor(this.interval / value);
    if (this.interval < 10) {
      this.interval = 10;
    }
    if (this.timer) {
      this.pause();
      this.play();
    }
    return Math.floor(1000 / this.interval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.index = 0;
    this.ended = this.iteration(this.index);
  }

  setIteration(callback) {
    this.iteration = callback;
  }

  getFps() {
    return Math.floor(1000 / this.interval);
  }
}

export default Player;
