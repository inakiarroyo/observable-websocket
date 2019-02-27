import { AnyFn } from './types';

export class ObservableEvent {
  private eventName: string;
  private actions: AnyFn[];

  constructor(eventName: string) {
    this.eventName = eventName;
    this.actions = [];
  }

  public isEmpty() {
    return this.actions.length <= 0;
  }

  public hasAction(action: AnyFn) {
    return this.actions.indexOf(action) > -1;
  }

  public subscribeAction(action: AnyFn) {
    this.actions.push(action);
  }

  public unSubscribeAction(action: AnyFn) {
    const index = this.actions.indexOf(action);

    if (index > -1) {
      this.actions.splice(index, 1);
    }
  }

  public exec(data: any) {
    const actions = this.actions.slice(0);

    actions.forEach((action) => {
      action(data);
    });
  }

}
