const events = new Map();
type EventsUnionType = "toggleTheme";

const bus = {
  $on(event: EventsUnionType, cb: (...arg: any) => any) {
    if (!events.has(event)) {
      events.set(event, []);
    }
    events.get(event).push(cb);
  },
  $emit(event: EventsUnionType, data?: any) {
    if (events.has(event)) {
      events.get(event).forEach((cb: (...arg: any) => any) => {
        cb(data);
      });
    } else {
      throw new Error("events doesn't have that event object");
    }
  },
};
// export type BusType = typeof bus;
// export default bus;
