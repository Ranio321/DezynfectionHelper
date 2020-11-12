import { useRef, useState, useCallback, useEffect } from "react";

type DataLoaderResult<T> = [
  T,
  Promise<T> | undefined,
  (resetData?: boolean) => any
];

export function useDataLoader<T>(
  fetchFn: () => Promise<T>,
  deps?: any[]
): DataLoaderResult<T | undefined> {
  const currentPromiseRef = useRef<Promise<T>>();

  const [data, setData] = useState<T>();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [promise, setPromise] = useState<Promise<T>>();
  const refreshCallback = useCallback(
    (resetData?: boolean) => {
      if (resetData === true) setData(undefined);
      setRefreshCounter(refreshCounter + 1);
    },
    [refreshCounter]
  );

  useEffect(() => {
    setData(undefined);
  }, deps || []); // eslint-disable-line

  useEffect(() => {
    let effectDiscarded = false;

    const promise = fetchFn();
    currentPromiseRef.current = promise;
    setPromise(promise);

    promise
      .then((res) => {
        if (effectDiscarded) return;
        if (currentPromiseRef.current !== promise) return;

        setData(res);
      })
      .catch((err) => {
        console.error(err);
        setData(undefined);
      });

    return () => {
      effectDiscarded = true;
    };
  }, [refreshCounter, ...(deps || [])]); // eslint-disable-line

  return [data, promise, refreshCallback];
}
