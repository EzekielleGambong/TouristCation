import { Outlet } from "react-router-dom";

import NavbarDefault from "../navbars/navbar_default";

export default function LayoutDefault() {
  return (
    <>
      <noscript>You need to enable JavaScript to run this app.</noscript>

      {/* NAVBAR */}
      <NavbarDefault />

      {/* CONTENT */}
      <main className="2xl:container 2xl:mx-auto p-6 xl:p-12">
        <Outlet />
      </main>
    </>
  );
}
