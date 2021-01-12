import { stringify } from "javascript-stringify";

(window as any).rxdDsp = function (type, detail, start_time, exec_id, start_state, end_state) {
  detail = detail || {};
  detail.start_time = start_time;
  detail.exec_id = exec_id;
  detail.start_state = stringify(start_state);
  detail.end_state = stringify(end_state);

  const ev = new CustomEvent(type, { detail });
  document.dispatchEvent(ev);
};
