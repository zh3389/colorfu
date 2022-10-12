import { getTextOptions } from "./text";
import { getBackgroundOptions } from "./background";
import { getColorOptions } from "./color";

export function getAttributeOptions(options) {
  return {
    type: "container",
    children: [
      {
        type: "section",
        name: "颜色",
        help: `
        <p style="color: #606266;font-size:14px;line-height: 1.4;">在此设置与颜色相关的属性。</p>
        <img  src="http://pearmini.gitee.io/assets/colorfu/color-palette.gif" />
        `,
        children: [
          {
            type: "collapse",
            name: "调色板",
            defaultOpen: true,
            indent: false,
            children: [
              {
                type: "color-palette",
              },
            ],
          },
          ...getColorOptions(options),
        ],
      },
      {
        type: "section",
        name: "句子",
        help: `
        <p style="color: #606266;font-size:14px;line-height: 1.4;">在此处设置与前景词相关的属性。.</p>
        <img src="http://pearmini.gitee.io/assets/colorfu/size-preview.png" width="100%"/>
        `,
        children: getTextOptions(options),
      },
      {
        type: "section",
        name: "背景",
        help: `
        <p style="color: #606266;font-size:14px;line-height: 1.4;">此处设置与背景相关的属性。</p>
        <img src="http://pearmini.gitee.io/assets/colorfu/background-preivew.png" width="100%"/>
        `,
        children: getBackgroundOptions(options),
      },
    ],
  };
}
