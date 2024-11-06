import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function View() {
  const [view, setView] = useState("grid");
  const handleView = (e) => {
    setView(e.target.value);
  };

  return (
    <div className="flex flex-row gap-1 ">
      <label className={classNames(`group flex aspect-square transition-all hover:bg-sky-500 p-1`, view === "grid" ? "bg-sky-500" : "bg-gray-300")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={classNames(`w-6 group-hover:fill-white`, view === "grid" ? "fill-white" : "fill-black")}>
          <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520Z" />
        </svg>
        <input type="radio" name="view" value="grid" checked={view === "grid"} onChange={handleView} />
      </label>

      <label className={classNames(`group flex aspect-square transition-all hover:bg-sky-500 p-1`, view === "list" ? "bg-sky-500" : "bg-gray-300")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={classNames(`w-6 group-hover:fill-white`, view === "list" ? "fill-white" : "fill-black")}>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"
          />
        </svg>
        <input type="radio" name="view" value="list" checked={view === "list"} onChange={handleView} />
      </label>
    </div>
  );
}
