import { get } from "../object";
import { getPatternColorOptions } from "./pattern";

export function getColorOptions(options) {
  return [...getWordsColors(options), ...getBackgroundColors(options)];
}

function getWordsColors(options) {
  const type = get(options, "text.type");
  if (!type || type === "none") {
    return [
      {
        type: "color",
        key: "text.color",
        name: "文字颜色"
      }
    ];
  } else {
    return getPatternColorOptions(options, "text", "Words");
  }
}

function getBackgroundColors(options) {
  const mode = get(options, "background.mode");
  const type = get(options, "background.type");
  if (mode === "image") return [];
  if (!type || type === "none") {
    return [
      {
        type: "color",
        key: "background.color",
        name: "背景颜色"
      }
    ];
  } else {
    return getPatternColorOptions(options, "background", "Background");
  }
}
