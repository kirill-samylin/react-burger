export const getJSON = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Ошибка')
}
