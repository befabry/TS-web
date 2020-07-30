interface UserProps {
  name?: string;
  age?: number;
}

//A function that takes no argument and return nothing
type EventCallback = () => void;

export class User {
  /**
   * An object with multiple properties associated to an array of Callbacks
   *
   *  {
   *      'click' : [Callback, Callback]
   *      'hover' : []
   *      'mouseenter' : [Callback, Callback]
   *  }
   */
  events: { [key: string]: EventCallback[] };

  constructor(private data: UserProps) {
    this.events = {};
  }

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: EventCallback): void {
    //similar to ?? but works with undefined or falsy values
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
}
