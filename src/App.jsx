import QrReader, { Webcam } from "./components/QrReader.jsx";


function App() {

  return (
    <div className={""}>
      <Webcam>
        <QrReader />
      </Webcam>
    </div>


  );
}

export default App;
