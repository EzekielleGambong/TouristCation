import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// # ~ ~ ~ ~ ~ # # ~ ~ ~ ~ ~ # CSS # ~ ~ ~ ~ ~ # # ~ ~ ~ ~ ~ # //
import './index.css';

// # ~ ~ ~ ~ ~ # # ~ ~ ~ ~ ~ # PAGES # ~ ~ ~ ~ ~ # # ~ ~ ~ ~ ~ # //
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
export default function TouristCation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />}/>

        {/* SAMPLE */}
        {/* <Route path="/user/" element={<LayoutUser />}>
          <Route path="/user/packages" element={<Packages />} />
          <Route path="/user/new_client" element={<NewClient />} />
          <Route path="/user/client_status" element={<ClientStatus />} />
          <Route path="/user/reports" element={<Reports />} />
          <Route path="/user/client_history" element={<ClientHistory />} />

          <Route index element={<Error />} />
          <Route path="/user/*" element={<Error />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <TouristCation />
  </React.StrictMode>
);