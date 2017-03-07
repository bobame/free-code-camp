const RandomSearch = () => {
  return (
    <div className="random-search">
      <button id="random-search">
        Surprise me!
      </button>
      <span className='or'>or...</span>
    </div>
  );
}

class SearchIcon extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
  }

  handleSearchIconClick() {
    console.log('Clicked search icon');
    this.setState({ isBeforeSearchField: false });
    // console.log('test => ', this.state.isBeforeSearchField);

  }

  render() {
    return(
      <div className="user-search">
        <button onClick={this.handleSearchIconClick} id="user-search-icon">
          <i className="fa fa-search"></i>
        </button>
        <div className="text-search">
          <p id="text-search">Click icon to search</p>
        </div>
      </div>
    );
  }
}

const TextSearch = () => {
  return (
    <div className="user-search">
      <input type="search" list="search-suggestions" id="user-search-field" className="form-control" placeholder="Enter search..." />
      <button id="clear-btn">Close</button>
      <button id="search-btn">Search</button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeforeSearchField: true,
      searchString: ''
    }
  }

  render() {
    // Starting state is search icon
    // Once use clicks icon, search field displayss
    let SEARCH_FEATURE = (this.state.isBeforeSearchField)?
        <SearchIcon /> :
        <TextSearch />;
    return (
      <div className='container text-center'>
        <RandomSearch />
        { SEARCH_FEATURE }
        { console.log('==> ', this.state.isBeforeSearchField) }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));


/*
render() {
  if (this.state.beforeSearchField) {
    return (
      <div className='container text-center'>
        <RandomSearch />
        <SearchIcon />
        <CallToAction />
      </div>
    );
  } else {
    return (
      <div className='container text-center'>
        <RandomSearch />
        <TextSearch />
        <CallToAction />
      </div>
    );
  }
}
*/
