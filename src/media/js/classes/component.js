export function Component() {
  this.onInit();
  if (module.hot) {
    module.hot.dispose(() => {
      this.onDestroy();
    });
  }
}

Component.prototype.setState = function(stateToMerge) {
  const prevState = {
    ...this.state,
  };
  this.state = {
    ...this.state,
    ...stateToMerge,
  };
  this.onStateUpdate(prevState);
};
