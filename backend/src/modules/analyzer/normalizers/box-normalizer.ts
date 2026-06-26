import type {
  BoxNode
} from "../composite";

import type {
  Box
} from "../analyzer.types";

export function normalizeBox(
  box: BoxNode
): Box {

  return {

    id:
      box.id,

    kind:
      "box",

    x:
      box.x,

    y:
      box.y,

    endX:
      box.endX,

    endY:
      box.endY,

    width:
      box.width,

    height:
      box.height,

    children:
      box.children,

    page:
      box.page
  };
}
