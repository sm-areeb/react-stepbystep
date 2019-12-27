window.addEventListener("load", function() {
  function Counter(props) {
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  Counter.prototype.render = function() {
    const { count } = this.state;
    /* return React.createElement(React.Fragment, null, 
    React.createElement("button", {onClick:this.handleClick}, '+1'),
    React.createElement("p", null, count)) */
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>+1</button>
        <p>{count}</p>
      </React.Fragment>
    )
  }
  
  Counter.prototype.handleClick = function() {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }
  
  Object.setPrototypeOf(Counter.prototype, React.Component.prototype);

  ReactDOM.render(
    <Counter/>,
    document.getElementById("root")
  )
});
