function Signal() {
  this.handlers = [];
}

Signal.prototype = {
  _throwError() {
    throw new Error('Callback handler must be function!');
  },

  add(handler, context) {
    if (typeof handler !== 'function') {
      this._throwError();
      return;
    }
    this.handlers.push({ handler: handler, context: context });
    return handler;
  },

  remove(handler) {
    if (typeof handler !== 'function') {
      this._throwError();
      return;
    }
    const totalHandlers = this.handlers.length;
    for (let k = 0; k < totalHandlers; k++) {
      if (handler === this.handlers[k].handler) {
        this.handlers.splice(k, 1);
        return handler;
      }
    }
  },

  call() {
    const totalHandlers = this.handlers.length;
    for (let k = 0; k < totalHandlers; k++) {
      const handlerData = this.handlers[k];
      handlerData.handler.apply(handlerData.context || null, arguments);
    }
  },

  delayedCall(delay = 100) {
    const args = Array.prototype.slice.call(arguments);
    args.shift();

    setTimeout(() => {
      this.call.apply(this, args);
    }, delay);
  },
};

module.exports = Signal;
