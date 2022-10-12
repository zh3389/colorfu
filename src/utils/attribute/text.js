import { getPatternRelations, getPatternStyleOptions } from "./pattern";
import { get } from "../object";
import { systemFonts } from "../font";
import { onlineFonts } from "../../data/fonts";

function font(d) {
  return {
    value: d.name,
    label: d.name + (d.type ? ` (${d.type})` : ""),
    template: `<span style="font-family:${d.name}">${d.name}</span>`,
    url: d.fontURL
  };
}

export function getTextOptions(options) {
  return [
    {
      type: "symbol-text",
      key: "text.content",
      name: "内容",
      placeholder: "请输入文字"
    },
    {
      name: "字体",
      type: "collapse",
      defaultOpen: false,
      children: [
        {
          type: "select-group",
          key: "text.fontFamily",
          name: "字体商店",
          groups: [
            {
              label: "在线字体",
              options: onlineFonts.map(font)
            },
            {
              label: "系统字体",
              options: systemFonts.map(font)
            }
          ],
          relations: [...onlineFonts, ...systemFonts].map(d => ({
            trigger: d.name,
            actions: [{ key: "text.fontURL", value: d.fontURL, force: true }]
          }))
        },
        {
          type: "select",
          key: "text.mode",
          name: "字体尺寸",
          options: [
            { value: "none", label: "普通" },
            { value: "autoFit", label: "自动调整" },
            { value: "constrain", label: "强制" }
          ],
          relations: [
            {
              trigger: "none",
              actions: [{ key: "text.fontSize", value: 200 }]
            },
            {
              trigger: "autoFit",
              actions: [
                {
                  key: "text.padding",
                  value: 0
                },
                {
                  key: "text.dy",
                  value: 0
                }
              ]
            },
            {
              trigger: "constrain",
              actions: [
                { key: "text.fontSize", value: 200 },
                {
                  key: "text.padding",
                  value: 50
                },
                {
                  key: "text.dy",
                  value: 0
                }
              ]
            }
          ]
        },
        ...getTextFontOptions(options)
      ]
    },
    {
      type: "collapse",
      name: "图案",
      defaultOpen: false,
      children: [
        {
          type: "select",
          key: "text.type",
          name: "类型",
          options: [
            { value: "none", label: "无" },
            { value: "line", label: "线条" },
            { value: "dot", label: "圆点" },
            { value: "wave", label: "海浪" },
            { value: "square", label: "正方形" }
          ],
          relations: getPatternRelations(options, "text")
        },
        ...getTextStyleOptions(options)
      ]
    }
  ];
}

function getTextFontOptions(options) {
  const mode = get(options, "text.mode");
  const fontSize = {
    type: "number",
    key: "text.fontSize",
    name: "字体大小",
    min: 50
  };
  const padding = {
    type: "number",
    key: "text.padding",
    name: "填充",
    min: 0
  };
  const dy = {
    type: "number",
    key: "text.dy",
    name: "偏移Y"
  };
  if (mode === "none") return [fontSize, dy];
  if (mode === "autoFit") return [padding, dy];
  if (mode === "constrain") return [fontSize, padding, dy];
}

function getTextStyleOptions(options) {
  const type = get(options, "text.type");
  if (!type || type === "none") {
    return [];
  } else {
    return getPatternStyleOptions(options, "text");
  }
}
