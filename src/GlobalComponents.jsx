const TextInput = ({ ...config }) => {
  return (
    <input
      {...config}
      type="text"
      className="border-cyan-600 border-2 rounded-md"
    ></input>
  );
};

const Button = ({ children, ...config }) => {
  return (
    <button
      className="border-2 rounded-md bg-blue-700 shadow-md shadow-blue-500 w-32 text-white p-2"
      {...config}
    >
      {children}
    </button>
  );
};

const Spacer = ({ height }) => {
  return <div style={{ height }}></div>;
};
export { TextInput, Button, Spacer };
