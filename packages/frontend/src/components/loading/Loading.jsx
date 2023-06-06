import Spinner from "react-bootstrap/Spinner";
import './loading.css';

const Loading = () => {
  return (
    <div id="content">
      <h1 id="text">LOADING</h1>
      <div id="spin">
        <Spinner id="spinner" animation="border" />
      </div>
    </div>
  );
}

export default Loading;