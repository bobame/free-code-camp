/* CLI => python -m SimpleHTTPServer */

/* HELPERS */
const getFahrenheit = () => {
  console.log("INFO:\tHELPER - getFahrenheit()");
}

const getPosition = () => {
  console.log("INFO:\tHELPER - getPosition()");
  //checking for geolocation, https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation#The_geolocation_object
  if ("geolocation" in navigator) {
    console.log("TRUE - geolocation in navigator");
  } else {
    console.log("FALSE - geolocation not in navigator");
  }
}

/* COMPONENTS */
const Header = () => {
  console.log("INFO:\tCOMPONENT - <Header />");
  return(
    <div className="container-fluid header">
      <h1>Free Code Camp</h1>
      <h3>Local Weather App</h3>
    </div>
  );
}

class LocalWeather extends React.Component {
  constructor(props) {
    console.log("INFO:\tCOMPONENT - <LocalWeather />");
    super(props);

    this.state = {
      data: null
    };

  }

  render() {
    console.log("INFO:\tLIFECYCLE - LocalWeather.render()");
    return (
      null
    );
  }

  componentDidMount() {
    console.log("INFO:\tLIFECYCLE - LocalWeather.componentDidMount()");
    const URL = 'http://api.openweathermap.org/data/2.5/weather?';
    //lat=35&lon=139&appid=987bdab9b6f926dbb6de05bf67491e93";
    getPosition();
    let LAT = 35;
    let LONG = 139;
    let API_KEY = '987bdab9b6f926dbb6de05bf67491e93';
    let API_URL = `${URL}lat=${LAT}&lon=${LONG}&appid=${API_KEY}`;

    console.log("INFO:\tAPI_URL", API_URL);
    $.getJSON(API_URL).done((response) => {
      console.log(response);

      this.setState({
        data: response
      });
    }.bind(this));
  }
}

const App = () => {
  return(
    <div className="container-fluid text-center">
      <Header />
      <LocalWeather />
    </div>
  );
}

/* RENDER */
ReactDOM.render(<App />, document.querySelector('#app'));
