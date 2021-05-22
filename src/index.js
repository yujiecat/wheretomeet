import ReactDOM from "react-dom";
import Homepage from './pages/homepage.js'
import SignIn from './pages/signinpage.js';
import SignUp from './pages/signuppage.js';
import 'bootstrap/dist/css/bootstrap.min.css';


if(module.hot){
  module.hot.accept()
}

function MainPage() {
  return (
    <>
      <Homepage />
      <SignIn />
      <SignUp />
    </>
  );
}


ReactDOM.render(<MainPage />, document.getElementById("root"));
