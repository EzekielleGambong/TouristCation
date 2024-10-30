import PropTypes from "prop-types";

export default function Sort({ settings }) {
  return (
    <select id="sort" className="w-full h-16 rounded-md bg-transparent focus:bg-transparent border-sky-500 focus:border-sky-500 focus:ring-0 font-bold ~text-xs/base text-sky-500">
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
};
