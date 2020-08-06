import { User, UserProps } from "../Models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  constructor(parent: Element, model: User) {
    super(parent, model);
    this.onSetAgeClick = this.onSetAgeClick.bind(this);
    this.onSetNameClick = this.onSetNameClick.bind(this);
    this.onSaveModel = this.onSaveModel.bind(this);
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveModel,
    };
  }

  onSaveModel(): void {
    this.model.save();
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
        <input placeholder="${this.model.get("name")}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }
}
