export const loadState = () => {
  try {
    if (typeof window === "undefined") {
      return undefined;
    }
    const serializedState = localStorage.getItem("gedmd-state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    if (typeof window === "undefined") {
      return;
    }
    const stateToSave = {
      documents: state.documents,
      blocks: state.blocks,
      images: state.images,
    };

    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("gedmd-state", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};
