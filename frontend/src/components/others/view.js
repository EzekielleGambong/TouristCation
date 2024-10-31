import { useStoreView } from "../../hooks/useStore";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function View() {
  const { view, setView } = useStoreView((state) => state);
  const handleView = (e) => {
    setView(e.target.value);
  };

  return (
    <div className="flex flex-row gap-1 ">
      <label className={classNames(`group flex aspect-square transition-all hover:bg-sky-500 p-1`, view === "grid" ? "bg-sky-500" : "bg-gray-300")}>
        <span className={classNames(`material-symbols-outlined group-hover:text-white`, view === "grid" ? "text-white" : "text-black")}>grid_view</span>
        <input type="radio" name="view" value="grid" checked={view === "grid"} onChange={handleView} />
      </label>

      <label className={classNames(`group flex aspect-square transition-all hover:bg-sky-500 p-1`, view === "list" ? "bg-sky-500" : "bg-gray-300")}>
        <span className={classNames(`material-symbols-outlined group-hover:text-white`, view === "list" ? "text-white" : "text-black")}>list</span>
        <input type="radio" name="view" value="list" checked={view === "list"} onChange={handleView} />
      </label>
    </div>
  );
}
