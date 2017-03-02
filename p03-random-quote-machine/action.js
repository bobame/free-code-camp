/*===== VARIABLES =====*/

//JSONP & getJSON()
const API_URL = 'http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?'

/*===== COMPONENTS =====*/

const Title = () => {
  return (
    <div className="container-fluid text-center top">
      <p id="page-title">Enligten Me!</p>
    </div>
  );
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteText: 'Courage is going from failure to failure without losing enthusiasm.',
      quoteAuthor: 'Winston Churchill',
      quoteLink: 'http://forismatic.com/en/6a81cd2a21/'
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  render() {
    return (
      <div className="container-fluid bottom">
        <div className="row quote text-center quote">
          <div className="col-sm-12">
            <i className="fa fa-quote-left"></i>
            <span id="quote">{this.state.quoteText}</span>
            <i className="fa fa-quote-right"></i>
          </div>
        </div>

        <div className="row author text-right author">
          <div className="col-sm-6 col-sm-offset-6">
            <p id="author">- {this.state.quoteAuthor}</p>
          </div>
        </div>

        <div className="row buttons">
          <div className="col-sm-2 col-sm-offset-0 text-left">
            <a href="https://twitter.com/share" target="_blank"><i className="fa fa-twitter-square"></i></a>
          </div>
          <div className="col-sm-4 col-sm-offset-6 text-right">
            <button onClick={this.handleButtonClick}>New Quote</button>
          </div>
        </div>
      </div>
    );
  }

  handleButtonClick(event) {
    $.getJSON(API_URL).done((response) => {
      this.setState({
        quoteText: response.quoteText,
        quoteAuthor: response.quoteAuthor,
        quoteLink: response.quoteLink
      });
      //generating random color, http://stackoverflow.com/a/1484514
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      $("html").css("background-color", color);
      $("body").css("background-color", color);
      $("button").css("background-color", color);
      $("#quote").css("color", color);
      $("#author").css("color", color);
      $(".fa").css("color", color);
    }.bind(this));
  }

}

const Footer = () => {
  return (
    <div className="container-fluid text-center foot">
      <span id="ref">by havefuncoding</span>
      <p id="attrib">quotes from <a href="http://forismatic.com/en/" target="_blank">forismatic</a></p>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <Title />
      <QuoteBox />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
