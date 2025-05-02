
import supabase from "../../SupabaseClient";
;
// const API_URL = "https://react-fast-pizza-api.jonas.io/api";
// const API_URL_LH = "http://localhost:3000";
const API_URL_SB = "https://kxfvcrhjbjavzcapwwve.supabase.co/rest/v1";
const API_KEY_SB = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4ZnZjcmhqYmphdnpjYXB3d3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMTE4NDgsImV4cCI6MjA2MTU4Nzg0OH0.jZFUesBz65FqjKi_lsbz9VyOayA0wDbQZY35lQ1hEm0";

export async function getMenu() {
  const res = await fetch(`${API_URL_SB}/Pizza`, {
    headers: {
      apikey: API_KEY_SB,
      Authorization: `Bearer ${API_KEY_SB}`,
    },
  });

  if (!res.ok) {
    console.error("Failed fetching from Supabase REST API", res.statusText);
    return [];
  }

  const data = await res.json();
  return data;
}
export async function getOrder(id) {
  const res = await fetch(`${API_URL_SB}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);
  const { data } = await res.json();
  return data;
}

// export async function createOrder(newOrder) {
//   try {
//     const res = await fetch(`${API_URL_SB}/order`, {
//       method: "POST",
//       body: JSON.stringify(newOrder),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw Error();
//     const { data } = await res.json();
//     return data;
//   } catch {
//     throw Error("Failed creating your order");
//   }
// }
export async function createOrder(newOrder) {
  console.log("fafafafchekingorder", newOrder);
  try {
    const res = await fetch(`${API_URL_SB}/Order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY_SB,
        Authorization: `Bearer ${API_KEY_SB}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Supabase Error:", errorText);
      throw new Error("Failed creating your order");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Failed creating your order");
  }
}


export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL_SB}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
