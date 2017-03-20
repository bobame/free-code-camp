const RANDOM_API = 'https://en.wikipedia.org/wiki/Special:Random';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeforeSearchField: true,
      searchString: '',
      buildingSearchString: '',
      results: []
    }
    // Error when not binded
    // Uncaught TypeError: Cannot read property <ex-'setState'> of null
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleSearchString = this.handleSearchString.bind(this);
  }

  handleRandomSearchButtonClick() {
    console.log('APP HELPER - handleRandomSearchButtonClick()');
    window.open(RANDOM_API, '_blank');
  }

  handleSearchIconClick() {
    console.log('APP HELPER - handleSearchIconClick()');
    this.setState({ isBeforeSearchField: false });
  }

  handleCloseButtonClick() {
    console.log('APP HELPER - handleCloseButtonClick()');
    this.setState({
      isBeforeSearchField: true,
      searchString: '',
      results: []
    });
  }

  handleSearchButtonClick() {
    console.log('APP HELPER - handleSearchButtonClick()');
    if (this.state.buildingSearchString.length === 0 || this.state.buildingSearchString == null) {
      console.log('What would you like to search for?');
    } else {
      // Callback to wait for setState before function, http://stackoverflow.com/a/37401726
      this.setState({
        searchString: this.state.buildingSearchString,
        buildingSearchString: '',
        results: []
      }, this.performSearch);
      // Also clearing input field
    }
  }

  performSearch() {
    console.log('APP HELPER - performSearch()');
    console.log('executing search for search string:', this.state.searchString);
    let SEARCH_API = `https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&search=${this.state.searchString}&format=json&callback=?`;

    axios.get(SEARCH_API)
    .then(function (response) {
      // Ignores beginning '/**/(' and ending ')'
      let data = response.data.substring(5, response.data.length-1);
      try {
        data = JSON.parse(data);
        console.log('Data:\t', data);
        // If successful, data format expected as follows
        // Array[4]
        // 0: <search_string>
        // 1: Array[10], containing <index>: <title>...
        // 2: Array[10], containing <index>: <description>...
        // 3: Array[10], containing <index>: <wikipedia_url>...
        for (let i=0; i<10; i++) {
          let tempResults = this.state.results;
          tempResults.push([
            data[1][i],
            data[2][i],
            data[3][i]
          ]);
        }
        console.log('Results:\t', this.state.results);
        this.triggerRender();
      } catch(e) {
        console.log('ERROR:\t', e);
      }
    }.bind(this)) // NOTE: need to bind else throwing state undefined error
    .catch(function (error) {
      console.log('ERROR:\t', error);
    });
  }

  handleSearchString(buildingSearchString) {
    console.log('APP HELPER - handleSearchString()');
    this.setState({ buildingSearchString });
  }

  triggerRender() {
    console.log('APP HELPER - triggerRender()');
    this.setState(this.state);
  }

  render() {
    console.log('APP LIFECYCLE - render()');
    return (
      <div className='container text-center'>
        <div className="random-search">
          <button
            onClick={this.handleRandomSearchButtonClick}
            id='random-search'
            title='Click me for a surprise article!'>
            Surprise me!
          </button>
          <span className='or'>or...</span>
        </div>
        {
          (this.state.isBeforeSearchField) ?
            <SearchIcon searchIconClick={this.handleSearchIconClick} /> :
            <TextSearch
                    closeButtonClick={this.handleCloseButtonClick}
                    searchButtonClick={this.handleSearchButtonClick}
                    buildingSearchString={this.handleSearchString}
                    inputDisplay={this.state.buildingSearchString} />
        }
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

const SearchIcon = (props) => {
  console.log('FUNC - SearchIcon(props)');
  return (
    <div className="user-search">
      <button onClick={props.searchIconClick} id="user-search-icon" title='Click to open search input field'>
        <i className="fa fa-search"></i>
      </button>
      <div className="text-search">
        <p id="text-search">Click icon to search</p>
      </div>
    </div>
  );
}

const TextSearch = (props) => {
  console.log('FUNC - TextSearch(props)');
  return (
    <div className="user-search">
      <input
            type="search"
            list="search-suggestions"
            id="user-search-field"
            className="form-control focusedInput"
            placeholder="Enter search..."
            onChange={event => props.buildingSearchString(event.target.value)}
            value={props.inputDisplay} />
      <button
            onClick={props.closeButtonClick}
            id="clear-btn"
            className='btn-default'>
            Close
      </button>
      <button
            onClick={props.searchButtonClick}
            id="search-btn"
            className='btn-default'>
            Search
      </button>
    </div>
  );
}

const SearchResults = (props) => {
  console.log('FUNC - SearchResults(props)', props.results);
  // Adding null check here, else fails while getting index of null
  if (props.results.length===0) {
    return null;
  }
  return (
    <div className="search-results">
      <ul id="search-results">
        {
          props.results.map(function(item, i){
            return <ResultListItem
                    key={i}
                    title={props.results[i][0]}
                    description={props.results[i][1]}
                    link={props.results[i][2]} />;
          })
        }
      </ul>
    </div>
  );
}

const ResultListItem = (props) => {
  console.log('FUNC - ResultListItem(props)');
  // console.log('ResultListItem:', props.link, props.title, props.description);
  return (
    // Formatting as follows, from pre-React original
    // a tag with src={link} and text as {title}
    // br tag
    // tag-less {description}
    <li>
      <a src={props.link} title={props.title} target='_blank'>{props.title}</a>
      <br />
      {props.description}
    </li>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
