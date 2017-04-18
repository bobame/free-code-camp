
const Data = {
  url_fcc: 'https://www.freecodecamp.com/havefuncoding',
  url_recent: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
  url_alltime: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
}

const Header = () => {
  //static header containing navbar with freecodecamp brand
  return (
    <div className='navbar navbar-default navbar-fixed-top' id='header'>
      <div className='navbar-brand'>
        freeCodeCamp&nbsp;
        <i className='fa fa-free-code-camp' aria-hidden='true'></i>
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: null,
      alltime: null,
      filterRecent: true //setting default filter as recent
    }
    this.sortRecent = this.sortRecent.bind(this);
    this.sortAlltime = this.sortAlltime.bind(this);
    this.displayLeaders = this.displayLeaders.bind(this);
  }

  componentWillMount() {
    console.log('App.componentWillMount()');
    // mounting data for sorting by recent
    $.getJSON(Data.url_recent).done(response => {
      this.setState({ recent: response });
    }.bind(this));
    // mounting data for sorting by alltime
    $.getJSON(Data.url_alltime).done(response => {
      this.setState({ alltime: response });
    });
  }

  sortRecent() {
    console.log('App.sortRecent()');
    this.setState({ filterRecent: true });
  }

  sortAlltime() {
    console.log('App.sortAlltime()');
    this.setState({ filterRecent: false });
  }

  displayLeaders(data) {
    console.log('App.displayLeaders()');
    if (!data) return; // prevents from rendering null
    return (
      <tbody>
      {
        data.map(function(leader, index) {
          return (
            <tr key={leader.username}>
              <td className='number text-center'>{index+1}</td>
              <td className='leader'><img src={leader.img} alt='Leader Avatar'/>{leader.username}</td>
              <td className='recent text-center'>{leader.recent}</td>
              <td className='alltime text-center'>{leader.alltime}</td>
            </tr>
          )
        })
      }
      </tbody>
    );
  }

  render() {
    console.log('App.render()');
    return (
      <div>
        <Header />
        <div className='container'>
          <table className='table table-hover'>
            <thead>
              <tr id='th-main'>
                <th colSpan={4} className='text-center'>Camper Leaderboard</th>
              </tr>
              <tr id='th-sub'>
                <th className='text-center'>#</th>
                <th className='text-center'>Camper Name</th>
                <th className='text-center'>Points (last 30 days)&nbsp;
                  <button
                    onClick={this.sortRecent}
                    id="sort-recent">
                    <i className="fa fa-sort-desc" aria-hidden="true"></i>
                  </button>
                </th>
                <th className='text-center'>Points (all time)&nbsp;
                  <button
                    onClick={this.sortAlltime}
                    id="sort-all">
                    <i className="fa fa-sort-desc" aria-hidden="true"></i>
                  </button>
                </th>
              </tr>
            </thead>
            {
              (this.state.filterRecent)
                ? this.displayLeaders(this.state.recent)
                : this.displayLeaders(this.state.alltime)
            }
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}

const Footer = () => {
  return (
    <div className='navbar navbar-fixed-bottom' id='footer'>
      <div id='creds'>
        by <a href={Data.url_fcc} target='_blank'>@havefuncoding</a>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));


/*
response.map((x, i) => {
  `<tr>
    <td>${i}</td>
    <td>${x.img}${x.username}</td>
    <td>${x.recent}</td>
    <td>${x.alltime}</td>
  </tr>`
}).join('\n')
*/
