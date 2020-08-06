import axios, { AxiosResponse } from "axios";
// Custom
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: T[];
  events: Eventing;

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {
    this.models = [];
    this.events = new Eventing();
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });

      //Trigger the change inside the then
      this.trigger("change");
    });
  }
}
