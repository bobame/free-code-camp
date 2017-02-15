/* VARIABLES */

const SRC_IMG = "http://f.edgesuite.net/imagecache/cropfit@w=800@cr=0,0,999,562@qa=85/data/www.humanrights.org/files/Eleanor-Roosevelt-%28gold%29_en.jpg?_=Y-0qJZFq";
const SRC_TIMELINE = "http://www.pbs.org/wgbh/americanexperience/features/timeline/eleanor/";
const SRC_WIKIPEDIA = "https://en.wikipedia.org/wiki/Eleanor_Roosevelt";

const TEXT_TITLE = "Eleanor Roosevelt";
const TEXT_SUBTITLE = "First Lady, Activist, Champion of Human Rights, Astounding Role Model for All";
const TEXT_PIC = "Eleanor Roosevelt holding a poster of the Universal Declaration of Human Rights.";
const TEXT_TIMELINE = "Here's a timeline of Eleanor Roosevelt's life:";
const TEXT_QUOTE = "Freedom makes a huge requirement of every human being. With freedom comes responsibility. For the person who is unwilling to grow up, the person who does not want to carry his own weight, this is a frightening prospect.";
const TEXT_CTA = "If you have time, you should read more about this incredible human being on her Wikipedia entry";

//TODO: ajax CORS solution to get timeline items drectly from source
const REF_TIMELINE = [
  {id: 1, year: "1884", content: "Eleanor Roosevelt is born in New York City."},
  {id: 2, year: "1912", content: "Eleanor attends her first Democratic Party Convention."},
  {id: 3, year: "1919", content: "Eleanor volunteers at St. Elizabeth Hospital to visit World War I veterans; She volunteers at the International Congress of Working Women in Washington. Congress passes the Eighteenth Amendment declaring Prohibition."},
  {id: 4, year: "1920", content: "Eleanor travels with Franklin on his campaign trail for the vice presidency; She becomes friends with Louis Howe; She joins the League of Women Voters. Congress passes the Nineteenth Amendment granting women the right to vote."},
  {id: 5, year: "1946", content: "Eleanor is elected as head of the United Nations Human Rights Commission; She begins to draft the Declaration of Human Rights; She initiates the creation of Americans for Democratic Action, a group which focuses on domestic social reform and resistance against Russia and the developing Cold War."},
  {id: 6, year: "1948", content: "Eleanor speaks on 'The Struggles for the Rights of Man' at the Sorbonne during a meeting of the United Nations General Assembly in Paris; She threatens her resignation from the UN if Truman does not recognize the newly formed state of Israel; She joins her daughter, Anna, for a radio discussion program on ABC."},
  {id: 7, year: "1948", content: "The Human Rights Declaration is passed by the United Nations."},
  {id: 8, year: "1951", content: "Eleanor joins her son, Elliott, for a television and radio show on NBC."},
  {id: 9, year: "1952", content: "Eleanor resigns from the United Nations; She campaigns for Adlai Stevenson for the presidency. One year later, the Women's Division of the Democratic National Committee will be abolished and its members will integrate into the existing Democratic party structure."},
  {id: 10, year: "1954", content: "The Brown v. Board of Education decision outlaws segregation in public schools."},
  {id: 11, year: "1957", content: "Eleanor visits the Soviet Union as a representative of the New York Post and meets Nikita Khrushchev. The Civil Rights Act is passed by Congress."},
  {id: 12, year: "1958", content: "Eleanor speaks at a civil rights workshop at Highlander Folk School in Tennessee despite threats from the Ku Klux Klan."},
  {id: 13, year: "1961", content: "Kennedy re-appoints Eleanor to the United Nations and appoints her as chair of the President's Commission on the Status of Women."},
  {id: 14, year: "1962", content: "Eleanor spearheads an ad hoc Commission of Inquiry into the Administration of Justice in the Freedom Struggle; She monitors and reports on the efforts and progress of the fight for civil rights in the United States."},
  {id: 15, year: "1962", content: "Eleanor dies at the age of 78 of tuberculosis."}
]

/* COMPONENTS */

function Header() {
  return (
    <div id="header">
      <h1 className="text-center">{TEXT_TITLE}</h1>
      <h5 className="text-center">{TEXT_SUBTITLE}</h5>
    </div>
  );
}

function Picture() {
  return (
    <div id="picture" className="text-center">
      <img src={SRC_IMG} alt="Image of Eleanor Roosevelt" className="img-responsive" />
      <div>
        <p className="text-center">{TEXT_PIC}</p>
      </div>
    </div>
  );
}

function Timeline(props) {
  return (
    <div id="timeline" className="row">
      <div className="col-md-8 col-md-offset-2">
        <h3>{TEXT_TIMELINE}</h3>
        <ul>
          {
            REF_TIMELINE.map(function(item) {
              return <li key={item.id}><span className="tyear">{item.year}</span> - {item.content}</li>
            })
          }
        </ul>
        <p id="timeline-source">*Click <a href={SRC_TIMELINE} target="_blank">here</a> for timeline source.</p>
        <div>
          <p id="quote-large">{TEXT_QUOTE}</p>
          <p id="quote-small">-- {TEXT_TITLE}</p>
        </div>
        <p id="cta">{TEXT_CTA}<a href={SRC_WIKIPEDIA} target="_blank"> here.</a></p>
      </div>
    </div>
  );
}

Timeline.propTypes = {
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
      <Timeline items={REF_TIMELINE}/>
      <Footer />
    </div>
  );
}

/* RENDERING */

ReactDOM.render(<TributePage />, document.getElementById("app"));
