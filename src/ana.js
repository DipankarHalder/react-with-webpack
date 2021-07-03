function _createAna() {
  let counter = 0;
  let isDestroy = false;

  const _listener = () => counter ++;
  document.addEventListener('click', _listener);

  return {
    _destroy() {
      document.removeEventListener('click', _listener);
      isDestroy = true;
    },
    _getClick() {
      if(isDestroy) {
        return "Ana is destroyed";
      }
      return counter;
    }
  }
}

window.ana = _createAna();