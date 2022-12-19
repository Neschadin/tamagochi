export class Tamagochi {
  constructor(name, parentHTMLElem) {
    this.name = name;
    this.health = 100;
    this.saturation = 100;
    this.strength = 100;
    this.happiness = 100;
    this._parentHTMLElem = parentHTMLElem;
    this._elemHTMLInstance = document.createElement("div");

    const checkParams = setInterval(() => {
      this._valueChange("health", -5);

      if (!this.health) {
        const elem = this._elemHTMLInstance.querySelector(".body")
        elem.classList.remove("body");
        elem.classList.add("body-after-death");

        clearInterval(checkParams);

        this._showParam("saturation", 0);
        this._showParam("strength", 0);
        this._showParam("happiness", 0);
        Object.freeze(this);
        return;
      }

      if (!this.saturation) this._valueChange("happiness", -20);
      if (!this.strength) this._valueChange("health", -5);
    }, 3000);
  }

  create() {
    this._elemHTMLInstance.classList.add("bird");
    this._elemHTMLInstance.title = this.name;
    this._elemHTMLInstance.innerHTML = `
    <div class="body">
        <div class="eye left"></div>
        <div class="eye right"></div>
        <div class="beak">
            <div></div>
        </div>
        <div class="feet"></div>
    </div>`;

    const elemHTMLMetrics = document.createElement("div");

    elemHTMLMetrics.classList.add("instance_metrics");
    elemHTMLMetrics.innerHTML = `
    <div>Name:<span class="name">${this.name}</span></div>
    <div>Health:<span class="health">${this.health}</span></div>
    <div>Saturation:<span class="saturation">${this.saturation}</span></div>
    <div>Strength:<span class="strength">${this.strength}</span></div>
    <div>Happiness:<span class="happiness">${this.happiness}</span></div>`;

    this._elemHTMLInstance.append(elemHTMLMetrics);
    this._parentHTMLElem.append(this._elemHTMLInstance);
  }

  _showParam(paramName, paramValue) {
    let elem = this._parentHTMLElem.querySelector(`[title=${this.name}] .${paramName}`);
    elem.textContent = paramValue;
  }

  _valueChange(paramName, decreaseValue) {
    this[paramName] =
      this[paramName] + decreaseValue <= 0 ?
      0 :
      this[paramName] + decreaseValue >= 100 ?
      100 :
      this[paramName] + decreaseValue;

    this._showParam(paramName, this[paramName]);
  }


  feed() {
    this._valueChange("saturation", 25);
  }

  play() {
    this._valueChange("happiness", 10);
    this._valueChange("saturation", -20);
    this._valueChange("strength", -10);
  }

  walk() {
    this._valueChange("saturation", -5);
    this._valueChange("strength", -5);
  }

  learnJS() {
    this._valueChange("health", -25);
    this._valueChange("strength", -25);
  }

  sleep() {
    this._valueChange("health", 10);
    this._valueChange("saturation", -5);
    this._valueChange("strength", 25);
  }

  treat() {
    this._showParam("health", this.health = 100);
  }
}