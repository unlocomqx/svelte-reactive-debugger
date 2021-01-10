function rxdDtringify(obj, replacer, spaces, cycleReplacer) {
  function serializer(replacer, cycleReplacer) {
    var stack = [], keys = []

    if (cycleReplacer == null) cycleReplacer = function(key, value) {
      if (stack[0] === value) return "[Circular ~]"
      return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
    }

    return function(key, value) {
      if (stack.length > 0) {
        var thisPos = stack.indexOf(this)
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
        if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
      }
      else stack.push(value)

      return replacer == null ? value : replacer.call(this, key, value)
    }
  }


  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

window.rxdDsp = function (type, detail, start_time, exec_id, start_state, end_state) {
  detail = detail || {};
  detail.start_time = start_time;
  detail.exec_id = exec_id;
  detail.start_state = rxdDtringify(start_state);
  detail.end_state = rxdDtringify(end_state);

  const ev = new CustomEvent(type, {detail});
  document.dispatchEvent(ev);
};
