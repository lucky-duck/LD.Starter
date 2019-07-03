export function StatefulComponent() {
  this.onInit();
  if (module.hot) {
    module.hot.dispose(() => {
      this.onDestroy();
    });
  }
}

StatefulComponent.prototype = {
  onInit() {},

  onStateUpdate() {},

  onDestroy() {},

  setState(stateToMerge) {
    const prevState = {
      ...this.state,
    };
    this.state = {
      ...this.state,
      ...stateToMerge,
    };
    this.onStateUpdate(prevState);
  },
};
