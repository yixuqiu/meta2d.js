declare const window: any;
export function radio(ctx: CanvasRenderingContext2D, pen: any) {
  if (!pen.onDestroy) {
    pen.onDestroy = onDestroy;
    pen.onAdd = onAdd;
    pen.onValue = onValue;
  }

  // let x = pen.calculative.worldRect.x;
  // let y = pen.calculative.worldRect.y;
  // let w = pen.calculative.worldRect.width;
  // let h = pen.calculative.worldRect.height;
  // ctx.beginPath();
  // ctx.rect(x, y, w, h);
  // ctx.stroke();
  // ctx.closePath();

  return false;
}

function onAdd(pen: any) {
  let x = pen.calculative.worldRect.x;
  let y = pen.calculative.worldRect.y;
  let w = pen.calculative.worldRect.width;
  let h = pen.calculative.worldRect.height;

  if (pen.direction == 'horizontal') {
    let length = pen.options.length;
    for (let i = 0; i < length; i++) {
      let childPen: any = {
        name: 'radioItem',
        x: x + (i * w) / length,
        y: y,
        width: w / length,
        height: h,
        isChecked: pen.selection === pen.options[i],
        text: pen.options[i],
        textLeft: (h * 6) / 5,
        fillColor: '#1890ff',
      };
      pen.calculative.canvas.makePen(childPen);
      pen.calculative.canvas.parent.pushChildren(pen, [childPen]);
    }
  } else if (pen.direction == 'vertical') {
    let length = pen.options.length;
    for (let i = 0; i < length; i++) {
      let childPen: any = {
        name: 'radioItem',
        x: x,
        y: y + ((i * h) / (length * 2 - 1)) * 2,
        width: w,
        height: h / (length * 2 - 1),
        isChecked: pen.selection === pen.options[i],
        text: pen.options[i],
        textLeft: ((h / (length * 2 - 1)) * 6) / 5,
        fillColor: '#1890ff',
      };
      pen.calculative.canvas.makePen(childPen);
      pen.calculative.canvas.parent.pushChildren(pen, [childPen]);
    }
  }
}
function onValue(pen: any) {
  let x = pen.calculative.worldRect.x;
  let y = pen.calculative.worldRect.y;
  let w = pen.calculative.worldRect.width;
  let h = pen.calculative.worldRect.height;

  if (pen.direction == 'horizontal') {
    let length = pen.options.length;
    for (let i = 0; i < length; i++) {
      let childPen: any = {
        id: pen.children[i],
        x: (i * w) / length / w,
        y: 0,
        width: 1 / length,
        height: 1,
        isChecked: pen.selection === pen.options[i],
        text: pen.options[i],
        textLeft: (h * 6) / 5,
      };
      pen.calculative.canvas.parent.setValue(childPen);
    }
  } else if (pen.direction == 'vertical') {
    let length = pen.options.length;
    for (let i = 0; i < length; i++) {
      let childPen: any = {
        id: pen.children[i],
        x: 0,
        y: (((i * h) / (length * 2 - 1)) * 2) / h,
        width: 1,
        height: 1 / (length * 2 - 1),
        isChecked: pen.selection === pen.options[i],
        text: pen.options[i],
        textLeft: ((h / (length * 2 - 1)) * 6) / 5,
      };
      pen.calculative.canvas.parent.setValue(childPen);
    }
  }
}
function onDestroy(pen: any) {
  pen.children.forEach((p) => {
    const i = pen.calculative.canvas.parent.store.data.pens.findIndex(
      (item) => item.id === p
    );
    if (i > -1) {
      pen.calculative.canvas.parent.store.data.pens.splice(i, 1);
      pen.calculative.canvas.parent.store.pens[p] = undefined;
    }
  });
  pen.children = undefined;
}
