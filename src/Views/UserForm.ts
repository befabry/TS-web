import { User } from "../Models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
    this.onSetAgeClick = this.onSetAgeClick.bind(this);
    this.onSetNameClick = this.onSetNameClick.bind(this);
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
    };
  }

  onSetAgeClick(): void {
    this.model.setRandomAge();
  }

  onSetNameClick(): void {
    const input = this.parent.querySelector("input");

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <p>
          User name: ${this.model.get("name")} <br />
          User age: ${this.model.get("age")}
        </p>
        <input placeholder="${this.model.get("name")}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
