export class ObservableEvent {
  private eventName: string;
  private actions: any[];

  constructor(eventName: string) {
    this.eventName = eventName;
    this.actions = [];
  }

  public isEmpty() {
    return this.actions.length <= 0;
  }

  public hasAction(action: any) {
    return this.actions.indexOf(action) > -1;
  }

  public subscribeAction(action: any) {
    this.actions.push(action);
  }

  public unSubscribeAction(action: any) {
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
