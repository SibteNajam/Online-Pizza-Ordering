import React from "react";

function Loader() {
  // inset used to strecth to all page
  return <div className="absolute bg-slate-200/20 backdrop-blur-sm inset-0 flex justify-center items-center">

   <div className="loader"></div>;
  </div>
}

export default Loader;
