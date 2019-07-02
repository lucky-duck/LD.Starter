(function(doc) {
  const scripts = doc.getElementsByTagName('script');
  const script = scripts[scripts.length - 1];
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    const div = doc.createElement('div');
    div.innerHTML = this.responseText;
    div.style.display = 'none';
    script.parentNode.insertBefore(div, script);
  };
  xhr.open('get', 'media/svg/sprite.svg', true);
  xhr.send();
})(document);
