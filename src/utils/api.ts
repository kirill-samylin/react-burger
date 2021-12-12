export const getIngredients = (url: string) => {
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка')
    })
    .then(({data}) => data);
}
