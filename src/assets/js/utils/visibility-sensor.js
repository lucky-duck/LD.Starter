class VisibilitySensor {
  added = [];

  constructor() {
    this.observer = new IntersectionObserver(this.update, {
      rootMargin: '0px 0px -30% 0px',
    });
  }

  update = (entries) => {
    entries.forEach((entry) => {
      const cb = this.added.find((v) => {
        return v.node === entry.target;
      }).cb;
      cb({ isVisible: entry.isIntersecting });
    });
  };

  observe(node, cb) {
    this.observer.observe(node);
    this.added.push({ cb, node });
  }

  unobserve(node) {
    this.observer.unobserve(node);
    this.added = this.added.filter((v) => v.node !== node);
  }
}

const visibilitySensor = new VisibilitySensor();

export default visibilitySensor;
