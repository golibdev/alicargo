import Home from './pages/Home';
import MainApp from './components/Main/MainApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Panel from "./components/Main/Panel";
import NewOrder from "./components/Main/NewOrder";
import { Client } from './pages/Client/Client';
import Warehouse from './pages/Warehouse/Warehouse';
import NewIdOrder from "./pages/NewOrder/NewIdOrder"; 
import Employe from './pages/employe/Empolye'
import { Error } from './components/Error/Error';
import WarehouseItem from './pages/Warehouse/WarehouseItem';
import SendOrder from './pages/SendOrder/SendOrder'
import Airoport from './pages/Airoport/Airoport';
import AiroportItems from './pages/Airoport/AiroportItems'
import Recive from './pages/ReceiveOrder/Receive';
import Flight from './pages/Flight/Flight';
import SubmitOrder from './pages/SubmitOrder/SubmitOrder';
import { Cargos } from './pages/Cargos/Cargos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="home" element={<MainApp />}>
          <Route index element={<Panel />} />
          <Route path='/home/cargos' element={<Cargos/>}/>
          <Route path="/home/new-order" element={<NewOrder />} />
          <Route path="/home/new-id-order" element={<NewIdOrder />} />
          <Route path='/home/clients' element={<Client />} />
          <Route path='/home/warehouse' element={<Warehouse />} />
          <Route path='/home/warehouse/:id' element={<WarehouseItem />} />
          <Route path="/home/employe" element={<Employe/>} />
          <Route path="/home/send-order" element={<SendOrder/>} />
          <Route path="/home/airoport" element={<Airoport/>} />
          <Route path="/home/airoport/:id" element={<AiroportItems/>} />
          <Route path='/home/recive' element={<Recive/>}/>
          <Route path='/home/submit-order' element={<SubmitOrder/>}/>
          <Route path='/home/flights' element={<Flight/>} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
