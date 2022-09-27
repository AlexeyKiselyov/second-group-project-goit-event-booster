export function countriesListMurkup(arr) {
  const countriesMurkup = arr
    .map(({ code, country }) => {
      return `<option value=${code} style="background-color: gray; color: #ffffff">${country}</option> `;
    })
    .join('');
  return countriesMurkup;
}