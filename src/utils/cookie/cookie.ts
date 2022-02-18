export function getCookie(name: string): string | undefined {
  //eslint-disable-next-line
  const seach = /([\.$?*|{}\(\)\[\]\\\/\+^])/g;
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(seach, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

type TSetCookie = (name: string, value: any, props?: { expires?: number | string | Date }) => void;

export const setCookie: TSetCookie = (name, value, props = {}): void => {
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  // @ts-ignore
  if (exp && typeof exp?.toUTCString === 'function') {
    // @ts-ignore
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    // @ts-ignore
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, null, { expires: -1 });
}
