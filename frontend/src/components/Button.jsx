function Button({ text, filled }) {
  const base = "rounded-full px-6 py-2 font-semibold transition hover:scale-105";
  const styles = filled
    ? "bg-teal-700 text-white hover:bg-teal-600"
    : "border border-teal-400 text-white hover:bg-teal-700";

  return <button className={`${base} ${styles}`}>{text}</button>;
}

export default Button;
