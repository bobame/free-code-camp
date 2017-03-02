/**************************************************
  http://stackoverflow.com/a/17299796
  CORS proxy, https://github.com/gr2m/CORS-Proxy

  npm install -g corsproxy
  corsproxy
  python -m SimpleHTTPServer
**************************************************/
/* VARIABLES */

const SRC = {
  img: "http://f.edgesuite.net/imagecache/cropfit@w=800@cr=0,0,999,562@qa=85/data/www.humanrights.org/files/Eleanor-Roosevelt-%28gold%29_en.jpg?_=Y-0qJZFq",
  timeline: "http://www.pbs.org/wgbh/americanexperience/features/timeline/eleanor/",
  wiki: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt"
}

const TEXT = {
  title: "Eleanor Roosevelt",
  subtitle: "First Lady, Activist, Champion of Human Rights, Astounding Role Model for All",
  pic: "Eleanor Roosevelt holding a poster of the Universal Declaration of Human Rights.",
  timeline: "Here's a timeline of Eleanor Roosevelt's life:",
  quote: "Freedom makes a huge requirement of every human being. With freedom comes responsibility. For the person who is unwilling to grow up, the person who does not want to carry his own weight, this is a frightening prospect.",
  cta: "If you have time, you should read more about this incredible human being on her Wikipedia entry"
}

/* COMPONENTS */

const Header = () => {
  console.log("INFO:\tFUNC - Header()");
  return (
    <div id="header">
      <h1 className="text-center">{TEXT.title}</h1>
      <h5 className="text-center">{TEXT.subtitle}</h5>
    </div>
  );
}

const Picture = () => {
  console.log("INFO:\tFUNC - Picture()");
  return (
    <div id="picture" className="text-center">
      <img src={SRC.img} alt="Image of Eleanor Roosevelt" className="img-responsive" />
      <div>
        <p className="text-center">{TEXT.pic}</p>
      </div>
    </div>
  );
}

const Timeline = () => {
  console.log("INFO:\tFUNC - Timeline()");
  return (
    <div id="timeline" className="row">
      <div className="col-md-8 col-md-offset-2">
        <h3>{TEXT.timeline}</h3>
        {/*the fun part, getting timeline items from source url*/}
        <TimelineItems />
        <p id="timeline-source">*Click <a href={SRC.timeline} target="_blank">here</a> for timeline source.</p>
        <div>
          <p id="quote-large">{TEXT.quote}</p>
          <p id="quote-small">-- {TEXT.title}</p>
        </div>
        <p id="cta">{TEXT.cta}<a href={SRC.wiki} target="_blank"> here.</a></p>
      </div>
    </div>
  );
}

class TimelineItems extends React.Component {
  //lifecycle, https://medium.com/react-ecosystem/react-components-lifecycle-ce09239010df#.ckstiuoqa
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fetching: false,
      error: null
    }
  }

  render() {
    console.log("INFO:\tFUNC - TimelineItems() => RENDERING");
    //returns placeholder if still loading or data yet null
    if (this.props.fetching || this.state.data.length===0) {
        return <div className='loading'>Loading...</div>;
    }
    //returns error message
    if (this.props.error) {
        return <div className='error'>{this.state.error.message}</div>;
    }
    //returns content, will be continuously rendered with new/updated data
    return (
      <div className='loaded'>
        <ul>
          {
            //using map function to loop through each state data array and render UI
            this.state.data.map(function(item) {
              return (
                <li key={item[0]}>
                  <span className="tyear">{item[1]}</span> -&nbsp;{item[2]}
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }

  componentDidMount() {
    console.log("INFO:\tFUNC - TimelineItems() => MOUNTING");
    this.setState({fetching: true});
    $.get('http://localhost:1337/www.pbs.org/wgbh/americanexperience/features/timeline/eleanor/').done(function(data) {
      //creating new html element to store source as html
      let source = document.createElement("html");
      source.innerHTML = data;
      //now able to search within html-converted content for className
      let items = $(source).find('.timeline_item');
      //looping through each chunk for item year and content
      //also fixes previous issue of misalignment between year and content when accessing purely on index
      for (var i=0; i<items.length; i++) {
        let sourceChunk = document.createElement('div');
        sourceChunk.innerHTML = items[i].innerHTML;
        let date = $(sourceChunk).find('.timeline_date').text();
        let year = date.substr(date.length-4);
        let content = $(sourceChunk).find('.timeline_item_content').text();
        //mutate state array, http://stackoverflow.com/a/26254086
        let data = this.state.data;
        this.state.data.push([i, year, content]);
        this.setState({data: data});
      }
    }.bind(this)); //not fully understanding this part still, but it is important
  }
}

const Footer = () => {
  console.log("INFO:\tFUNC - Footer()");
  return (
    <div>
      <hr />
      <footer className="text-center">
        Written and coded by <a href="https://www.freecodecamp.com/havefuncoding" target="_blank">Grace Nellore</a>.
      </footer>
    </div>
  );
}

/* Putting it all together */

const TributePage = () => {
  console.log("INFO:\tFUNC - TributePage()");
  return (
    <div id="main">
      <Header />
      <Picture />
      <Timeline />
      <Footer />
    </div>
  );
}

/* RENDERING */

ReactDOM.render(<TributePage />, document.getElementById("app"));
