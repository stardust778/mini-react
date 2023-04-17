/**
 * 将虚拟DOM转为真实DOM并添加到容器上 react 16.8之前的写法
 * @param element 虚拟DOM
 * @param container 真实DOM
 * **/
// export default function render(element, container) {
//   // 创建DOM节点，并处理文本节点
//   const dom = 
//     element.type === 'TEXT_ELEMENT' 
//       ? document.createTextNode('') 
//       : document.createElement(element.type);

//   // 为节点绑定属性
//   const isProperty = key => key !== 'children';

//   Object.keys(element.props)
//     .filter(isProperty)
//     .forEach(name => {
//       dom[name] = element.props[name]
//     })

//     // 递归添加子节点
//   element.props.children.forEach(child => 
//     render(child, dom)
//   )
//   // 将节点挂载到容器上
//   container.appendChild(dom);
// }

/**
 * 创建DOM
 * @param fiber fiber节点
 * @returns dom 真实dom节点
 * **/
function createDom(fiber) {
  const dom = 
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);
  
  // 过滤children属性
  const isProperty = key => key !== 'children';

  // 添加节点属性
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name =>
      dom[name] = fiber.props[name]
    )

  return dom;
}


// 下一个工作单元
let nextUnitOfWork = null;

/**
 * 将虚拟DOM转换为真实DOM，并添加到容器
 * @param element 虚拟DOM
 * @param container 真实DOM
 * **/
export default function render(element, container) {
  nextUnitOfWork = {
    dom: container,  // 根节点即容器
    props: {
      children: [element]
    }
  }
} 

/**
 * 工作循环
 * @param deadine 帧空余时间
 * **/
function workLoop(deadline) {
  // 停止循环标识
  let shouldYield = false;
  
  // 循环条件为存在下一个工作单元，并且没有更高优先级的工作
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining < 1;
  }
  // 浏览器空闲时间执行工作循环
  requestIdleCallback(workLoop);
}

// 浏览器空闲时间执行工作循环
requestIdleCallback(workLoop);

// 执行工作单元，返回下一个工作单元
function performUnitWork(fiber) {
  // fiber节点上没有dom节点，就创建一个
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 如果fiber有父节点，将fiber.dom添加到父节点
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // 获取到当前fiber的child节点
  const elements = fiber.props.children;
  // 索引
  let index = 0;
  // 上一个兄弟节点
  let prevSibling  = null;

  // 遍历孩子节点
  while (index < elements.length) {
    const element = elements[index];
    // 创建fiber
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }
    
    // 将第一个孩子节点设置为fiber的子节点
    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      // 第一个之外的子节点设置为第一个子节点的兄弟节点
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }

  // 寻找下一个子节点，如果有则返回
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 否则返回父节点
    nextFiber = nextFiber.parent;
  }
}