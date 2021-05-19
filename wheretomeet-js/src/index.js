import ReactDOM from "react-dom";

function GroupList() {
  return (
    <>
      <Title />
      <Group />
      <Additional />
    </>
  );
}

function Title() {
  return (
    <>
      <h1>Where to Meet test build</h1>
    </>
  );
}

function Group() {
  return (
    <>
      <ul>
        <li>
          <a href="https://www.fflogs.com/character/na/gilgamesh/ai%20zera">
            jeni</a>
        </li>
        <li>
          <a href="https://www.fflogs.com/character/na/gilgamesh/kyenx%20sol">
            thomas</a>
        </li>
        <li>
          <a href="https://www.fflogs.com/character/na/gilgamesh/sistine%20stella">
            stella
            </a>
        </li>
        <li>
          <a href="https://www.fflogs.com/character/na/gilgamesh/carrot%20order">
            carrot
            </a>
        </li>
        <li>
          <a href="https://www.fflogs.com/character/na/gilgamesh/cara%20kestus">
            jerry
            </a>
        </li>
        <li>
          <a href="https://www.fflogs.com/character/na/gilgamesh/row%20row">
            row row
            </a>
        </li>
      </ul>
    </>
  );
}

function Additional() {
  return (
    <>
      <ul>
        <li>
          <a href=" https://fflogs.com">fflogs</a>
        </li>
        <img src="https://i.imgur.com/qW6cpou.png" alt="aba" />
      </ul>
    </>
  );
}

ReactDOM.render(<GroupList />, document.getElementById("root"));
