var INITIAL_VALUE = "## FCC - Markdown Previewer\n\nSee **Wikipedia** Markdown article [_here_](http://en.wikipedia.org/wiki/Markdown).\n\n### Quotes:\n\n>  “A goal without a plan is just a wish.” -Antoine de Saint-Exupéry\n\n### Code:\n\n```\nalert(\"Let\'s go 2017!\");\n```\n\n### Bulleted List:\n\n- mango\n- pita bread\n    - raw honey\n    - peach marmalade\n- wooden basket\n\n### Numbered List:\n\n1. ziplines\n2. projects\n    - get creative\n    - get busy\n3. start search\n\n### Task List:\n\n- [ ] G\n- [ ] O \n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      markdown: INITIAL_VALUE
    };
  }
  handleChange(event) {
    this.setState({ markdown: event.target.value });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-5 markdown">
          <h1 className="text-center">Markdown</h1>
          <hr />
          <textarea
            onChange={this.handleChange.bind(this)}
            value={this.state.markdown}
            rows="10" />
        </div>
        <div className="col-md-5 preview">
          <h1 className="text-center">Preview</h1>
          <hr />
          <div dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}}></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
