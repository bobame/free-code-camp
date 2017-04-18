
const Data = {
  url_fcc: 'https://www.freecodecamp.com/havefuncoding'
}

const Header = () => {
  return (
    <div className='navbar navbar-default' id='header'>
      <div className='navbar-brand'>
        freeCodeCamp&nbsp;
        <i className='fa fa-free-code-camp' aria-hidden='true'></i>
      </div>
    </div>
  );
}

const FillerContent = () => {
  return (
    <div>
      {
        'Lorem ipsum dolor sit amet'.repeat(1000)
      }
    </div>
  );
}

const Leaderboard = (props) => {
  return (
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
                onClick={props.sortRecent}
                id="sort-recent">
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </button>
            </th>
            <th className='text-center'>Points (all time)&nbsp;
              <button
                onClick={props.sortAll}
                id="sort-all">
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </button>
            </th>
          </tr>
        </thead>
        {
          (props.leaders)? props.displayData() : null
        }
      </table>
    </div>
  );
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.sortRecent = this.sortRecent.bind(this);
    this.sortAll = this.sortAll.bind(this);
    this.displayData = this.displayData.bind(this);
  }

  sortRecent() {
    const sourceRecent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    console.log('clicked button to sort by recent');
    $.getJSON(sourceRecent).done((response) => {
      this.setState({
        data: response.map((x, i) => {
          `<tr>
            <td>${i}</td>
            <td>${x.img}${x.username}</td>
            <td>${x.recent}</td>
            <td>${x.alltime}</td>
          </tr>`
        }).join('\n')
      });
    }.bind(this));
  }

  sortAll() {
    console.log('clicked button to sort by all');
  }

  displayData() {
    console.log('need to display data');
    return (
      <tbody>
        {
          (document.querySelector('tbody'))? document.querySelector('tbody').innerHTML = this.state.data: null
        }
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <Leaderboard
          sortRecent={this.sortRecent}
          sortAll={this.sortAll}
          leaders={this.state.data}
          displayData={this.displayData} />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
