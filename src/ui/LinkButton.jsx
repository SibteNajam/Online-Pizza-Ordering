import { Link, useNavigate } from "react-router-dom";
const LinkButton = ({children,to}) => {
  const navigate = useNavigate();
  const className="text-sm text-blue-500 hover:text-blue-600 hover:transform-3d";;
  if (to ==='-1') 
  return  <button className={className} onClick={()=> navigate(-1)}>{children}</button>
  return (
    <Link to={to} className={className}>u&larr; {children}</Link>
  );
}

export default LinkButton;
