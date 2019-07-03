global.ProjectName = new (function() {
  this.modules = {
    SomeWidget: require('../components/some-widget/some-widget'),
  };
})();

if (module.hot) {
  module.hot.accept();
}
