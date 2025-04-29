// import { useLoaderData } from "react-router-dom";
// import { getMenu } from "../../services/apiRestaurant";
// import MenuItem from "./MenuItem";
// function Menu() {
//   const menu = useLoaderData(); // this hook automatically know that data from menuLoader
//   console.log("checkmenuformT", { menu });
//   return (
//     // this divide class placed in parent item that add some line between child elements
//     <ul className="divide-y divide-stone-200 px-2">
//       {menu.map((item) => (
//         <MenuItem key={item.id} pizza={item} />
//       ))}
//     </ul>
//   );
// }

// export async function loader() {
//   const menu = await getMenu();
//   return menu;
// }
// export default Menu;
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <div className="min-h-screen p-4 pizza-bg relative">
      <div className="crystal-container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold text-center mb-8 animate-fade-in">
          Our Delicious Menu
        </h2>
        <ul className="space-y-4">
          {menu.map((item) => (
            <MenuItem key={item.id} pizza={item} className="animate-slide-up" />
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;