import './Box.css';

function Box({ children }) {
  return <div className="box gradient-blue">{children}</div>;
}

export default Box;