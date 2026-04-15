export const loadState = () => {
  if (typeof window === "undefined" || !window.localStorage) return undefined;
  try {
    const serializedState = localStorage.getItem("gedmd-state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("gedmd-state", serializedState);
  } catch (err) { }
};


