import { getPatternStyleOptions, getPatternRelations } from "./pattern";
import { defaultImageURL } from "../../data/image";
import { get } from "../object";

export function getBackgroundOptions(options) {
  return [
    {
      type: "radio",
      key: "background.mode",
      name: "模式",
      options: [
        { value: "image", label: "图片" },
        { value: "pattern", label: "图案" }
      ],
      relations: [
        {
          trigger: "image",
          actions: [
            {
              key: "background.imageURL",
              value: defaultImageURL
            }
          ]
        },
        {
          trigger: "pattern",
          actions: [
            {
              key: "background.type",
              value: "none"
            },
            {
              key: "background.color",
              value: "#000000"
            }
          ]
        }
      ]
    },
    ...getModeOptions(options)
  ];
}

function getModeOptions(options) {
  const mode = get(options, "background.mode");
  if (mode === "image") {
    return [
      {
        type: "image",
        key: "background.imageURL",
        name: "图片"
      }
    ];
  } else {
    return [
      {
        type: "collapse",
        name: "图案",
        defaultOpen: false,
        children: [
          {
            type: "select",
            key: "background.type",
            name: "类型",
            options: [
              { value: "none", label: "无" },
              { value: "line", label: "线条" },
              { value: "dot", label: "圆点" },
              { value: "wave", label: "海浪" },
              { value: "square", label: "正方形" }
            ],
            relations: [
              {
                trigger: "none",
                actions: [
                  {
                    key: "background.color",
                    value: "#000000"
                  }
                ]
              },

              ...getPatternRelations(options, "background")
            ]
          },
          ...getStyleOptions(options)
        ]
      }
    ];
  }
}

function getStyleOptions(options) {
  const type = get(options, "background.type");
  if (!type || type === "none") {
    return [];
  } else {
    return getPatternStyleOptions(options, "background");
  }
}
