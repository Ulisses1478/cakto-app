type TranslateProps = Record<string, string | number>;

function translate(text: string, fields?: TranslateProps) {
  if (!text) {
    return "";
  }

  if (fields && text.includes("{{") && text.includes("}}")) {
    Object.keys(fields).forEach((key) => {
      text = text.replace(new RegExp(`{{${key}}}`, "g"), String(fields[key]));
    });
  }

  return text;
}

export const Utils = Object.freeze({
  translate,
});
