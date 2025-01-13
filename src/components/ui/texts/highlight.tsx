import React from "react";
import { TextStyle } from "react-native";

import { Base } from "./base";

interface TextHighlightProps {
  unhighlightedTextStyle?: TextStyle;
  highlightedTextStyle?: TextStyle;
  text: string;
}

export function Highlight(props: TextHighlightProps) {
  const { unhighlightedTextStyle, highlightedTextStyle, text } = props;

  const parts = text.split(/(##.*?##)/);

  return (
    <Base style={unhighlightedTextStyle}>
      {parts.map((part, index) => {
        if (part.startsWith("##") && part.endsWith("##")) {
          const highlightedText = part.slice(2, -2);
          return (
            <Base key={index} style={highlightedTextStyle}>
              {highlightedText}
            </Base>
          );
        }
        return (
          <Base key={index} style={unhighlightedTextStyle}>
            {part}
          </Base>
        );
      })}
    </Base>
  );
}
