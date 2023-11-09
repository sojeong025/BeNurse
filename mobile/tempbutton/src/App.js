import "./App.css";

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
    //다른데서 열었을때
    return;
  }
}

export default App;
