/**
 * 将虚拟DOM转为真实DOM并添加到容器上
 * @param element 虚拟DOM
 * @param container 真实DOM
 * **/
export default function render(element, container) {
  // 创建DOM节点，并处理文本节点
  const dom = 
    element.type === 'TEXT_ELEMENT' 
      ? document.createTextNode('') 
      : document.createElement(element.type);

  // 为节点绑定属性
  const isProperty = key => key !== 'children';

  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

    // 递归添加子节点
  element.props.children.forEach(child => 
    render(child, dom)
  )
  // 将节点挂载到容器上
  container.appendChild(dom);
}