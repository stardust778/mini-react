/**
 * 创建虚拟DOM结构
 * @param type 标签
 * @param props 属性
 * @param children 子属性
 * @returns 虚拟DOM结构
 * **/
export default function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
}

/**
 * 创建文本节点
 * @param text 文本值
 * @returns 虚拟DOM结构
 * **/

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}