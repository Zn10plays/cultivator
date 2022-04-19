class Behaviour {
  stateName: string
  currentState: {}

  public constructor(name, state) {
    this.stateName = name;
    this.currentState = state;
  }

  public execute() {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  public abort() {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  
  public get name(): string {
    return this.stateName
  }

  public get state() {
    return this.currentState;
  }
}