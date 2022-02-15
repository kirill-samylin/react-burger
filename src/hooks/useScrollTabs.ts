import {useCallback, useEffect, useRef, MutableRefObject} from "react";

type THandleChangeTab = (value: string) => void;

type TUseScrollTabs = (handleChangeTab: THandleChangeTab, defaultTabName?: string) => [
  viewRef: MutableRefObject<any>,
  onChangeTab: (value: string) => void
];

type TElementParams = {
  start: number;
  end: number;
  name: string;
}

export const useScrollTabs: TUseScrollTabs = (handleChangeTab, defaultTabName = 'bun') => {
  const viewRef = useRef<null | Element>(null);

  const getElements = useCallback((): TElementParams[] => {
    if (!viewRef?.current) return [];
    const elements = Array.from(viewRef.current.querySelectorAll('[data-type="tab-item"]'));
    if (!elements.length) return [];
    let width = 0;
    const array = [];
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element instanceof HTMLElement) {
        array.push({
          start: width,
          end: element.offsetHeight + width,
          name: element.id,
        });
        width+= element.offsetHeight;
      }
    }
    return array;
  }, [viewRef]);

  const handleSetTaPosition = useCallback((position) => {
    const items = getElements();
    const {name = defaultTabName} = items.find(({start, end}) => start <= position && end>=position) || {};
    handleChangeTab(name);
  }, [getElements, defaultTabName, handleChangeTab]);

  const handleScroll = useCallback((e) => {
    const scrollPosition = e.target.scrollTop;
    handleSetTaPosition(scrollPosition)
  }, [handleSetTaPosition]);

  const onChangeTab = useCallback((value) => {
    if (!viewRef.current) return;
    const items = getElements();
    const {name = defaultTabName, start = 0} = items.find(({name}) => value === name) || {};
    viewRef.current.scrollTop = start + 10;
    handleChangeTab(name);
  }, [getElements, viewRef, handleChangeTab, defaultTabName])

  useEffect(() => {
    let observerRefValue = viewRef?.current;
    if (observerRefValue) {
      observerRefValue.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (observerRefValue) {
        observerRefValue.removeEventListener('scroll', handleScroll);
      }
    }
  }, [viewRef, handleScroll]);

  return [viewRef, onChangeTab];
}
