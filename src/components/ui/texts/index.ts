import { Base, BaseTextProps } from "./base";
import { Highlight } from "./highlight";

export const Text = Object.freeze({ Base, Highlight });

export interface TextProps {
  Base: BaseTextProps;
}
