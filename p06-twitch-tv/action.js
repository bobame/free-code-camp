
const filterButtonWidth = '26%';
const filterButtonWidthFull = '100%';
const usersArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "summit1g"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div id='main' className='container'>
        <Top />
        <List />
        <Bottom />
      </div>
    );
  }
}

const Top = () => {
  return (
    <div id='top' className='container-fluid'>
      <div className='row'>
        <div className='col-sm-10'>
          <h1>
            Twitch Streamers
            <SearchIcon />
          </h1>
          <SearchInputForm />
        </div>
        <div className='col-sm-2'>
          <div className='row'>
            <button id='btn-all'><i className='fa fa-globe'></i>ALL</button>
          </div>
          <div className='row'>
            <button id='btn-on'><i className='fa fa-check-circle'></i>ONLINE</button>
          </div>
          <div className='row'>
            <button id='btn-off'><i className='fa fa-times-circle'></i>OFFLINE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SearchIcon = () => {
  return (
    <button
          id='search-icon'>
      <i className='fa fa-search'></i>
    </button>
  );
}

const SearchInputForm = () => {
  return (
    <form>
      <input
            id='search-input'
            list='autocomplete'
            type='search'
            placeholder='Search streamer...' />
      <datalist id='autocomplete'></datalist>
      <button id='submit'>Search</button>
      <button id='cancel'>Cancel</button>
    </form>
  );
}

const List = () => {
  return (
    <div id='list' className='container-fluid'>
      { /* Add Here */ }
    </div>
  );
}

const Bottom = () => {
  return (
    <div id='bottom' className='container-fluid'>
      { /* ADD HERE */ }
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
