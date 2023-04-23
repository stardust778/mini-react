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

function App(props){
  return <h1>H1,{props.name}!</h1>
}

React.render(<App name="foo"/>, document.getElementById('root'));


