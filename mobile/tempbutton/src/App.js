import "./App.css";
// import { main } from "./shift_work";
const { main } = require("./shift_work.tsx");

function Button(props) {
  const { label, styleClass, onClick, disabled } = props;
  return (
    <button className={styleClass} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button
          label="tempbutton"
          style={{
            width: 300,
            height: 200,
          }}
          onClick={ButtonClick}
          disabled={false}
        ></Button>
      </header>
    </div>
  );
}

function ButtonClick() {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzamFzMDQyQG5hdmVyLmNvbSIsImF1dGgiOiJVc2VyIiwiZXhwIjoxNjk5NDg4MTkxfQ.FicDQgUTw3x8w65tSceRdpDBjcdI2aJYMchqSswKRkI"
    );
  } else {
    console.log(main);
    return;
  }
}

export default App;
