//A function that takes no argument and return nothing
type EventCallback = () => void;

export class Eventing {
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

  constructor() {
    this.events = {};
  }

  on(eventName: string, callback: EventCallback): void {
    //similar to ?? but works with undefined or falsy values
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback();
    });
  }
}
