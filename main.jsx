window.addEventListener("load", function() {
  class HomeListing extends React.Component {
    constructor(props) {
      super();
      this.state = {
        homes: [],
        saves: []
      };
      this.toggleSave = this.toggleSave.bind(this);
    }

    loadHomesFromServer() {
      var homes = [
        {
          address: "12345 Beverly Dr",
          description: "this is a home in the city",
          photo: "assets/images/home.jpg",
          saves: 52,
          saved: true
        },
        {
          address: "98786 Tweety th",
          description: "this is a home in the suburbs",
          photo: "assets/images/home.jpg",
          saves: 123,
          saved: false
        },
        {
          address: "1 small st",
          description: "this is a home in the city",
          photo: "assets/images/home.jpg",
          saves: 52,
          saved: true
        }
      ];
      this.setState({ homes });
    }

    loadSavesFromServer() {
      var saves = [
        {
          saves: 52,
          saved: true
        },
        {
          saves: 123,
          saved: false
        },
        {
          saves: 52,
          saved: true
        }
      ];
      this.setState({ saves });
    }

    toggleSave(index) {
      var saves = this.state.saves;
      if (saves[index].saved) {
        saves[index].saves--;
        saves[index].saved = false;
      } else {
        saves[index].saves++;
        saves[index].saved = true;
      }
      this.setState({ saves });

      return saves[index].saved;
    }

    componentDidMount() {
      this.loadHomesFromServer();
      this.loadSavesFromServer();
    }

    render() {
      var saves = this.state.saves;
      var toggleSave = this.toggleSave;
      var homeNodes = this.state.homes.map((home, index) => {
        if (typeof saves[index] == undefined) {
          saves[index] = { saves: 0 };
        }
        return (
          <Home
            key={index}
            id={index}
            onToggleSave={toggleSave}
            isSaved={saves[index].saved}
            photo={home.photo}
            address={home.address}
            numSaves={saves[index].saves}
          >
            {home.description}
          </Home>
        );
      });
      return <div className="homeList">{homeNodes}</div>;
    }
  }

  class Home extends React.Component {
    constructor(props) {
      super();
      this.toggleSave = this.toggleSave.bind(this);
    }

    toggleSave(index) {
      return this.props.onToggleSave(index);
    }

    render() {
      return (
        <div className="home">
          <span className="homeAddress">{this.props.address}</span>
          <Photo src={this.props.photo}></Photo>
          <span className="homeDescription">{this.props.children}</span>
          <Saves
            id={this.props.id}
            handleSave={this.toggleSave}
            isSaved={this.props.isSaved}
            numSaves={this.props.numSaves}
          ></Saves>
        </div>
      );
    }
  }

  class Photo extends React.Component {
    constructor(props) {
      super();
    }
    render() {
      return (
        <div className="homePhoto">
          <img src={this.props.src} />
        </div>
      );
    }
  }

  class Saves extends React.Component {
    constructor(props) {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
      e.preventDefault();
      var isSaved = this.props.handleSave(this.props.id);
    }
    render() {
      var savedText = "";
      var submitText = "save";
      if (this.props.isSaved) {
        var savedText = "You have saved this home.";
        var submitText = "Remove";
      }
      return (
        <div className="saves">
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value={submitText} />
          </form>
          {this.props.numSaves} saves. {savedText}
        </div>
      );
    }
  }

  ReactDOM.render(
    <HomeListing url="homes.json" savesUrl="saves.json" pollInterval={10000} />,
    document.getElementById("root")
  );
});
