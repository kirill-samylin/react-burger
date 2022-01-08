const getRes = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Ошибка')
}

export const getIngredients = (url: string) => {
  return fetch(url)
    .then(getRes)
    .then(({data}) => data);
}

export const createOrderApi = (url: string, ids: string[]) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ids,
    })
  })
    .then(getRes)
    .then(({order}) => order);
}
