import { Howl } from "howler";

const sfx = {
  theme: new Howl({
    src: "/01AsteroidDancePart1.mp3",
    loop: true,
    volume: 0.7,
    html5: true,
  }),
  laser: new Howl({
    src: "/mixkit-laser-weapon-shot-1681.wav",
    volume: 0.3,
  }),
  laser2: new Howl({
    src: "/mixkit-short-laser-gun-shot-1670.wav",
    volume: 0.3,
  }),
  explosion: new Howl({
    src: "/explosion-91872.mp3",
    volume: 0.5,
  }),
  cannon: new Howl({
    src: "/mixkit-space-plasma-shot-3002.wav",
    volume: 0.3,
    rate: 0.5,
  }),
};

export { sfx };

const muteBtn = document.querySelector("#mute");
if (!localStorage.getItem("mute")) {
  if (muteBtn) {
    muteBtn.classList.add("on");
  }
} else if (localStorage.getItem("mute") === "false") {
  if (muteBtn) {
    muteBtn.classList.add("off");
  }
} else if (localStorage.getItem("mute") === "true") {
  if (muteBtn) {
    muteBtn.classList.add("on");
  }
}

if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    if (!localStorage.getItem("mute")) {
      localStorage.setItem("mute", "false");
      muteBtn.classList.add("off");
      muteBtn.classList.remove("on");
      sfx.theme.stop();
      return;
    } else if (localStorage.getItem("mute") === "false") {
      localStorage.setItem("mute", "true");
      muteBtn.classList.add("on");
      muteBtn.classList.remove("off");

      sfx.theme.play();
      return;
    } else if (localStorage.getItem("mute") === "true") {
      localStorage.setItem("mute", "false");
      muteBtn.classList.add("off");
      muteBtn.classList.remove("on");

      sfx.theme.stop();
      return;
    }
  });
}
