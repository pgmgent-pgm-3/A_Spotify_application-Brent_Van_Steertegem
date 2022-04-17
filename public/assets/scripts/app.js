const app = {
  init() {
    this.cacheElements();
    this.registerListeners();
  },

  cacheElements() {
    this.$playBtn = document.querySelector(".playing_song__control--play");
  },

  registerListeners() {
    this.$playBtn.addEventListener("click", () => {
      if (!this.$playBtn.classList.contains("isPlaying")) {
        this.$playBtn.classList.add("isPlaying");
        if (!this.sound) {
          this.playSound("/assets/audio/slipknot-psychosocial.mp3");
        } else {
          this.sound.volume = 0.7;
        }
      } else {
        this.$playBtn.classList.remove("isPlaying");
        this.sound.volume = 0;
      }
    });
  },

  playSound(soundPath) {
    this.sound = new Audio(soundPath);
    this.sound.volume = 0.7;
    this.sound.play();
  },
};

app.init();
