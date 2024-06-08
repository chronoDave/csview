export type Child = string | HTMLElement;

const createChild = (child: Child) => typeof child === 'string' ?
  document.createTextNode(child) :
  child;

export default (
  tag: string,
  attributes: Partial<Record<string, string | boolean | number>>,
  children?: Child | Child[]
) => {
  const root = document.createElement(tag);
  Object.entries(attributes).forEach(([k, v]) => root.setAttribute(k, `${v}`));
  (Array.isArray(children) ? children : [children])
    .forEach(child => child && root.appendChild(createChild(child)));

  return root;
};
