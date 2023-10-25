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
          stylesClass=""
          onClick={ButtonClick}
          disabled={false}
        ></Button>
      </header>
    </div>
  );
}

function ButtonClick() {
  if (window.ReactNativeWebView) {
    // alert("클릭됨");
    window.ReactNativeWebView.postMessage("click_event");
  } else {
    let obtest = "";
    for (const a in window) {
      obtest += a;
      obtest += "\n";
    }

    alert(obtest);
  }
}

export default App;
