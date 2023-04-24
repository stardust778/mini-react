import React from '../react';

const updateValue = e => {
  render(e.target.value)
}

const render = value => {
  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </div>
  )
  React.render(element, document.getElementById('root'));
}

// render('world');

function Counter1() {
  const [state, setState] = React.useState(1)
  return (
    <div>
      <h1 >
          Count: {state}
      </h1>
      <button onClick={() => setState(c => c + 1)}>+1</button>
    </div>
  )
}

class Counter2 extends React.Component {
  render() {
    return (
      <div>
        <h1>我是</h1>
        <h2>class组件</h2>
      </div>
    )
  }
}

React.render(<div><Counter1 /><Counter2 /></div>, document.getElementById('root'));



