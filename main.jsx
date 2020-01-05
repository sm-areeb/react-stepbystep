window.addEventListener("load", function() {
  class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      const { count } = this.state;
      this.setState({ count: count + 1 });
    }
    render() {
      const { count } = this.state;
      return (
        <React.Fragment>
          <button onClick={this.handleClick}>+1</button>
          <p>{count}</p>
        </React.Fragment>
      );
    }
  }

  ReactDOM.render(<Counter />, document.getElementById("root"));
});
