interface ScenesState {
  type: 'child' | 'adult' | undefined;
}

const initialState: ScenesState = {
  type: undefined,
};

export { initialState, ScenesState };
