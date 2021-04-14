import { useCallback, useEffect } from "react";

export default function useRightMouseClick(callback: () => any): () => any {
  const onContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      callback();
    },
    [callback]
  );

  const removeListener = useCallback(
    () => window.removeEventListener("contextmenu", onContextMenu),
    [onContextMenu]
  );

  useEffect(() => {
    window.addEventListener("contextmenu", onContextMenu);
    return () => removeListener();
  }, [onContextMenu, removeListener]);

  return removeListener;
}
