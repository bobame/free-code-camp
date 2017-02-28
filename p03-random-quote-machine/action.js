
//set initial values Quote & Author
//

/*===== VARIABLES =====*/

const API_URL = 'http://localhost:1337/api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=parseQuote';



/*===== HELPERS =====*/

//generating random color, http://stackoverflow.com/a/1484514
const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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
      quote: 'You can avoid reality, but you cannot avoid the consequences of avoiding reality.',
      author: 'Ayn Rand'
    };
  }

  render() {
    return (
      <div className="container-fluid bottom">
        <div className="row quote text-center quote">
          <div className="col-sm-12">
            <i className="fa fa-quote-left"></i>
            <span id="quote">{this.state.quote}</span>
            <i className="fa fa-quote-right"></i>
          </div>
        </div>

        <div className="row author text-right author">
          <div className="col-sm-6 col-sm-offset-6">
            <p id="author">- {this.state.author}</p>
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
    console.log(event.target);
    $.get(API_URL).done(function(data) {
      let quoteText = data.quoteText;
      let quoteAuthor = data.quoteAuthor;
      let quoteLink = data.quoteLink;
      console.log(data, typeof data);
      console.log("quoteText:\t", quoteText);
      console.log("quoteAuthor:\t", quoteAuthor);
      console.log("quoteLink:\t", quoteLink);
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
