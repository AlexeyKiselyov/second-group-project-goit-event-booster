const refLoader = document.querySelector('.backdrop-loader');

export function loaderOn() {
  refLoader.classList.remove('is-hidd');
}

export function loaderOff() {
  refLoader.classList.add('is-hidd');
}
