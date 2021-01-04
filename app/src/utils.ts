export function trigger (node: HTMLElement, event: string, data = null): boolean {
  const customEvent = new CustomEvent(event, { detail: data });
  return node.dispatchEvent(customEvent);
}
