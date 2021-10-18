interface InsuranceState {
  urlIndex: number | undefined;
  type: number | undefined;
}

const initialState: InsuranceState = {
  urlIndex: undefined,
  type: undefined,
};

export { initialState,  InsuranceState };
