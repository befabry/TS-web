import { AxiosPromise, AxiosResponse } from "axios";

export interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(value: T): void;
}

export interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

//A function that takes no argument and return nothing
export type EventCallback = () => void;

export interface Events {
  on(eventName: string, callback: EventCallback): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  get = this.attributes.get;
  trigger = this.events.trigger;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id: number | undefined = this.attributes.get("id");

    if (!id) {
      throw new Error("Cannot fetch without an id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
