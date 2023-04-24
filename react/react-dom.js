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
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  
  // 添加fiber节点属性
  updateDom(dom, {}, fiber.props)
  return dom;
}


// 下一个工作单元
let nextUnitOfWork = null;
// fiber树根节点
let wipRoot = null;
// 保存更新前的fiber树
let currentRoot = null;
// 保存要删除的节点
let deletions = null;

/**
 * 将虚拟DOM转换为真实DOM，并添加到容器
 * @param element 虚拟DOM
 * @param container 真实DOM
 * **/
export default function render(element, container) {
  // 根节点
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    // 最后一个fiber树的引用
    alternate: currentRoot
  };
  deletions = [];
  // 将根节点设置为下一个将要工作单元
  nextUnitOfWork = wipRoot;
}

// 判断监听事件
const isEvent = key => key.startsWith("on");
// 过滤fiber节点children属性以及监听事件
const isProperty = key =>
  key !== "children" && !isEvent(key);
// 判断fiber节点新属性
const isNew = (prev, next) => key =>
  prev[key] !== next[key];
// 判断fiber节点要删除的属性
const isGone = (prev, next) => key => !(key in next);

/**
 * 更新fiber节点方法
 * @param dom fiber节点
 * @param prevProps 旧节点属性
 * @param nextProps 新节点属性
 * **/ 
function updateDom(dom, prevProps, nextProps) {
  // remove old or change event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  // remove fiber old property
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })

  // add fiber new property
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}

/**
 * 处理提交的fiber树
 * @param fiber fiber节点
 * **/
function commitWork(fiber) {
  if (!fiber) {
    return
  }

  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  // 处理新增节点标记
  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom);
    // 处理删除节点标记
  } else if (fiber.effectTag === "DELETION") {
    // domParent.removeChild(fiber.dom);
    commitDeletion(fiber, domParent)
    // 处理更新属性
  } else if (
    fiber.effectTag === "UPDATE" &&
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    );
  }

  // 渲染子节点
  commitWork(fiber.child);
  // 渲染兄弟节点
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

/**
 * 提交任务，将fiber tree渲染为真实DOM
 * **/
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

/**
 * 工作循环
 * @param deadine 帧空余时间
 * **/
function workLoop(deadline) {
  // 停止循环标识
  let shouldYield = false
  // 循环条件为存在下一个工作单元，且没有更高优先级的工作
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitWork(
      nextUnitOfWork
    );
    // 当前帧空余时间要没了，停止工作循环
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 没有下一个工作单元，提交当前fiber树
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  // 空闲时间执行任务
  requestIdleCallback(workLoop);
}

// 浏览器空闲时间执行工作循环
requestIdleCallback(workLoop);

// 执行工作单元，返回下一个工作单元
function performUnitWork(fiber) {
  const isFunctionComponent = 
    fiber.type instanceof Function;
  
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber);
  }

  // 寻找下一个孩子节点，如果有返回
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber;
  while (nextFiber) {
    // 如果有兄弟节点，返回兄弟节点
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    // 否则返回父节点
    nextFiber = nextFiber.parent;
  }
}

// 当前fiber节点
let wipFiber = null;
// 当前hooks索引
let hookIndex = null;

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}



export function useState(initialState) {
  const oldHook = 
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  
  const hook = {
    state: oldHook ? oldHook.state : initialState,
    queue: []
  };

  // 执行setState的action
  const actions = (oldHook) ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  })

  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  }

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

/**
 * reconcile阶段，给节点打上增删改标记
 * @param wipFiber 根节点
 * @param elements 子节点
 * **/

function reconcileChildren(wipFiber, elements) {
  // 索引
  let index = 0
  // 上一次渲染的fiber
  let oldFiber =
    wipFiber.alternate && wipFiber.alternate.child
  // 上一个兄弟节点
  let prevSibling = null

  // 遍历孩子节点
  while (index < elements.length || oldFiber != null) {
    const element = elements[index]
    // 创建fiber
    let newFiber = null

    // 类型判断
    const sameType =
      oldFiber &&
      element &&
      element.type == oldFiber.type

    // 类型相同只更新props
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      }
    }
    // 新的存在并且类型和老的不同需要新增
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      }
    }
    // 老的存在并且类型和新的不同需要移除
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    // 将第一个孩子节点设置为 fiber 的子节点
    if (index === 0) {
      wipFiber.child = newFiber
    } else if (element) {
      // 第一个之外的子节点设置为第一个子节点的兄弟节点
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}