import PropTypes from "prop-types";

export default function Sort({ settings, onSortChange }) {
  return (
    <select
      id="sort"
      className="w-full h-16 rounded-md bg-transparent focus:bg-transparent border-sky-500 focus:border-sky-500 focus:ring-0 font-bold ~text-xs/base text-sky-500"
      onChange={(e) => onSortChange(e.target.value)} // Added onChange to notify parent component
    >
      {settings.map((option, key) => (
        <option key={key} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

Sort.propTypes = {
  settings: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSortChange: PropTypes.func.isRequired, // Added onSortChange as prop
};
