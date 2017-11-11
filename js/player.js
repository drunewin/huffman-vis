class Player {
  constructor(callback, index, interval) {
    this.iteration = callback;
    this.index = index || 0;
    this.timer = null;
    this.interval = interval || 500;
  }

  play() {
    if (!this.timer) {
      this.timer = setInterval(() => this.iteration(this.index++), this.interval);
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
      return;
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
    if (this.interval === 1) {
      return;
    }
    this.interval = Math.floor(this.interval / value);
    if (this.interval < 1) {
      this.interval = 1;
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
    this.iteration(this.index);
  }

  setIteration(callback) {
    this.iteration = callback;
  }

  getFps() {
    return Math.floor(1000 / this.interval);
  }
}

export default Player;
