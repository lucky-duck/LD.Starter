class SomeWidget {
  currentIndex = 0;
  timeout = 2000;

  constructor() {
    this.containerNode = document.querySelector('[data-widget]');
    this.itemNodes = Array.from(
      this.containerNode.querySelector('[data-widget-items]').children
    );

    this.update();

    const timeoutId = setInterval(() => {
      this.next();
    }, this.timeout);

    if (module.hot) {
      module.hot.dispose(() => {
        clearInterval(timeoutId);
      });
    }
  }

  next() {
    this.currentIndex =
      this.currentIndex < this.itemNodes.length - 1 ? this.currentIndex + 1 : 0;
    this.update();
  }

  update() {
    this.itemNodes.forEach((node) => {
      node.style.opacity = '0';
    });
    const currentItemNode = this.itemNodes[this.currentIndex];
    currentItemNode.style.opacity = '1';
  }
}

export default new SomeWidget();
