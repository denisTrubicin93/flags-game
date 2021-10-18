interface Rectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}
interface Attributes {
  gender: string;
  age: number;
  smile: number;
  facequality: number;
  health: number;
  stain: number;
  darkCircle: number;
  acne: number;
}
interface SkinState {
  imageBase64: string;
  faceRectangle: Rectangle | undefined;
  attributes: Attributes | undefined;
}

const initialState: SkinState = {
  imageBase64: "",
  faceRectangle: undefined,
  attributes: undefined,
};

export { initialState, SkinState, Attributes, Rectangle };
