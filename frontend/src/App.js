import './App.css';
import Chat from './components/Chat';
import Contacts from './components/Contacts';

function App() {
  return (
    <div className="app">
      <div className="container">
          <Contacts />
          <Chat />
      </div>
    </div>
  );
}

export default App;
