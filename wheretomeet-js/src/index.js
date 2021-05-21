import ReactDOM from "react-dom";
import LandingPage from './landingpage.js'

if(module.hot){
  module.hot.accept()
}

function MainPage() {
  return (
    <>
      <LandingPage />
    </>
  );
}


ReactDOM.render(<MainPage />, document.getElementById("root"));
