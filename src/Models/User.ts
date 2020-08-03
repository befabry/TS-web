import { AxiosResponse } from "axios";
//Custom
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  public events: Eventing;
  public sync: Sync<UserProps>;
  public attributes: Attributes<UserProps>;

  constructor(attributes: UserProps) {
    this.events = new Eventing();
    this.sync = new Sync<UserProps>(rootUrl);
    this.attributes = new Attributes<UserProps>(attributes);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.attributes.get("id");

    if (!id) {
      throw new Error("Cannot fetch without an id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }
}
