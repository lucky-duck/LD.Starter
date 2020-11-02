import './utils/svg-sprites';

global.ProjectName = new (function () {
  this.modules = {
    SomeWidget: require('../components/some-widget/some-widget'),
  };
})();
