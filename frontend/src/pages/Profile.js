import React from 'react';
import UserForm from '../components/profile_ui';
import NavbarPlan from "../components/navbars/navbar_plan";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarPlan />
      <div className="flex justify-center items-center pt-20">
        <UserForm />
      </div>
    </div>
  );
}

export default App;
