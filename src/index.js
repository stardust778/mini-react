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

render('world');


