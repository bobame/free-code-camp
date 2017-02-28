

/*===== HELPERS =====*/

//generating random color, http://stackoverflow.com/a/1484514
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*===== COMPONENTS =====*/

function Title() {
  return (
    <div className="container-fluid text-center top">
      <p id="page-title">Enligten Me!</p>
    </div>
  );
}

function Center() {
  return (
    <div className="container-fluid bottom">
      <div className="row quote text-center quote">
        <div className="col-sm-12">
          <i className="fa fa-quote-left"></i>
          <span id="quote">"You can avoid reality, but you cannot avoid the consequences of avoiding reality."</span>
          <i className="fa fa-quote-right"></i>
        </div>
      </div>

      <div className="row author text-right author">
        <div className="col-sm-6 col-sm-offset-6">
          <p id="author">- Ayn Rand</p>
        </div>
      </div>

      <div className="row buttons">
        <div className="col-sm-2 col-sm-offset-0 text-left">
          <a href="https://twitter.com/share" target="_blank"><i className="fa fa-twitter-square"></i></a>
        </div>
        <div className="col-sm-4 col-sm-offset-6 text-right">
          <button>New Quote</button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="container-fluid text-center foot">
      <span id="ref">by havefuncoding</span>
      <p id="attrib">quotes from <a href="http://forismatic.com/en/" target="_blank">forismatic</a></p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Title />
      <Center />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
