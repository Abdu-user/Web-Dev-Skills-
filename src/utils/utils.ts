export function keyboardCheck(e: KeyboardEvent, cb: (...arg: any) => void, keys: { [key: string]: boolean } = { Enter: true }) {
  keys = { Enter: true, ...keys };
  if (keys["Space"] === true) {
    keys[" "] = true;
    delete keys["Space"];
  }
  Object.keys(keys).forEach((key) => {
    if (e.key === key) {
      cb();
    }
  });
}
