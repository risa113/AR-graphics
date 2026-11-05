// Sound disabled per project specifications
class SoundEngine {
  constructor() {
    this.enabled = false;
  }
  init() {}
  toggle() { return false; }
  playHover() {}
  playClick() {}
  playChime() {}
}

export const soundManager = new SoundEngine();
