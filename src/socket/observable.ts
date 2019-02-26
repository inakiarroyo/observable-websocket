import { ObservableEvent } from './observable-event';

type EventMap = Map<string, ObservableEvent>;

export class Observable {
  private eventMap: EventMap;

  constructor() {
    this.eventMap = new Map();
  }

  public dispatch(eventName: string, data: any) {
    const event = this.eventMap.get(eventName);

    if (event) {
      event.exec(data);
    }
  }

  public subscribe(eventName: string, action: any) {
    let event = this.eventMap.get(eventName);

    if (!event) {
      event = new ObservableEvent(eventName);
      this.eventMap.set(eventName, event);
    }

    event.subscribeAction(action);
  }

  public unSubscribe(eventName: string, action: any) {
    const event = this.eventMap.get(eventName);

    if (!event || !event.hasAction(action)) {
      return;
    }

    event.unSubscribeAction(action);

    if (event.isEmpty()) {
      this.eventMap.delete(eventName);
    }
  }
}
