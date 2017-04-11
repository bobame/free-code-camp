
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

const Leaderboard = () => {
  return (
    <div className='container'>
      
    </div>
  );
}


const Footer = () => {
  return (
    <div className='navbar navbar-bottom' id='footer'>
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
  }

  render() {
    return (
      <div>
        <Header />
        <Leaderboard />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
