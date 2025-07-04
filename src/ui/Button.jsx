import { Link } from 'react-router-dom';

const Button = ({ children, disabled, to, type, onClick }) => {

  const base = ' text-sm bg-yellow-400 hover:bg-yellow-300 transition-colors duration-300 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full focus:outline-none focus:ring  focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 cursor-pointer hover:cursor-pointer';
  const styles = {
    primary: base + ' py-3 px-4  md:px-6 md:py-4 ',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3 md:py-1.5 text-sm ',
    secondary: ' text-sm bg-transparent border-2 border-stone-300  hover:bg-stone-300 transition-colors duration-300 uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full focus:outline-none focus:ring focus-text-stone-800  focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 cursor-pointer hover:cursor-pointer hover:text-stone-6 00 py-2.5 px-3 md:px-6 md:py-3.5 ',
  }
  if (to) return <Link to={to} className={styles[type]}>{children}</Link>

  if (onClick)
    return (
      <div>
        <button onClick={onClick} disabled={disabled} className={styles[type]}>
          {children}
        </button>
      </div>
    );
  return (
    <div>
      <button disabled={disabled} className={styles[type]}>
        {children}
      </button>
    </div>
  );
}

export default Button;
