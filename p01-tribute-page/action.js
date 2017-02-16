/**************************************************
  http://stackoverflow.com/a/17299796
  CORS proxy, https://github.com/gr2m/CORS-Proxy

  npm install -g corsproxy
  corsproxy
  python -m SimpleHTTPServer
**************************************************/


let TIMELINE_ITEMS = [];

function testAjax() {
  var url = "http://localhost:1337/www.pbs.org/wgbh/americanexperience/features/timeline/eleanor/";
  $.ajax({
    url: url,
    type: 'GET',
    success: function(html) {
      var source = document.createElement("html");
      source.innerHTML = html;
      var count = $(html).find(".timeline_item").length;
      for (var i=0; i<count; i++) {
        var date = $(html).find(".timeline_date")[i].innerHTML;
        var year = date.substr(date.length-4);
        var content = $(html).find(".timeline_item_content>p>span")[i].innerHTML;
        // console.log(year + ":" + content);
        TIMELINE_ITEMS.push({
          id: i,
          year: year,
          content: content
        });
      }
      console.log(TIMELINE_ITEMS);
      
    },
    error: function() {
      console.log("ERROR: failed ajax call.");
    }
  });
}

// testAjax();

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

function Header() {
  return (
    <div id="header">
      <h1 className="text-center">{TEXT.title}</h1>
      <h5 className="text-center">{TEXT.subtitle}</h5>
    </div>
  );
}

function Picture() {
  return (
    <div id="picture" className="text-center">
      <img src={SRC.img} alt="Image of Eleanor Roosevelt" className="img-responsive" />
      <div>
        <p className="text-center">{TEXT.pic}</p>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div id="timeline" className="row">
      <div className="col-md-8 col-md-offset-2">
        <h3>{TEXT.timeline}</h3>

        { testAjax() }

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

function TimelineItems(props) {
  return (
    <ul>
      {
        props.items.map(function(item) {
          return <li key={item.id}><span className="tyear">{item.year}</span> - {item.content}</li>
        })
      }
    </ul>
  );
}

TimelineItems.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    year: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
  })).isRequired,
}

function Footer() {
  return (
    <div>
      <hr />
      <footer className="text-center">
        Written and coded by <a href="https://www.freecodecamp.com/havefuncoding" target="_blank">Grace Nellore</a>.
      </footer>
    </div>
  );
}

function TributePage() {
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
