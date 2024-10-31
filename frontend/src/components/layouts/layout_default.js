import { Outlet } from "react-router-dom";

import NavbarDefault from "../navbars/navbar_default";
import FooterDefault from "../footers/footer_default";

export default function LayoutDefault() {
  return (
    <div className="h-screen">
      {/* NAVBAR */}
      <NavbarDefault />

      {/* CONTENT */}
      <main className="2xl:container 2xl:mx-auto flex flex-col space-y-8 px-6 xl:px-12">
        <Outlet />
      </main>

      {/* FOOTER */}
      <FooterDefault />
    </div>
  );
}
