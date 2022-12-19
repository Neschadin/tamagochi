import {
  Tamagochi
} from "./Tamagochi.js";

const tamagochiHTMLWrapper = document.querySelector(".tamagochi_wrapper");
const tamagochiRoom = {};
let selectedTamagochi = null;

const popupBg = document.querySelector(".popup__bg");
const popupForm = document.querySelector(".popup__form");

const showPopup = (mode) => {
  popupForm.reset();
  popupForm.classList[mode]("active");
  popupBg.classList[mode]("active");
};

popupForm.addEventListener("submit", (e) => {
  let value = e.target[0].value;
  value = value.replace(/[^a-z|\d]/gi, "");

  e.preventDefault();

  if (value && !tamagochiRoom[value] && value.length <= 10) {
    createTamagochiInstance(value);
    showPopup("remove");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") showPopup("remove");
});

document.addEventListener("click", (e) => {
  if (e.target === popupBg) showPopup("remove");
});

document.querySelector("nav").addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    if (e.target.id === "createTamagochi") {
      showPopup("add");
      return;
    }

    if (selectedTamagochi && !Object.isFrozen(selectedTamagochi)) {
      selectedTamagochi[e.target.id]();
    }
  }
});

tamagochiHTMLWrapper.addEventListener("click", (e) => {
  const bird = e.target.closest(".bird");

  if (!bird || !tamagochiHTMLWrapper.contains(bird) || selectedTamagochi?.name === bird.title) return;

  selectedTamagochi = tamagochiRoom[bird.title];

  tamagochiHTMLWrapper.querySelectorAll(".bird")
    .forEach(item => item.classList.remove("selected"));

  bird.classList.add("selected");
});


//main func
function createTamagochiInstance(tamagochiName) {
  const instance = new Tamagochi(tamagochiName, tamagochiHTMLWrapper);

  tamagochiRoom[tamagochiName] = instance;

  instance.create();
}