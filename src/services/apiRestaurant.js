
import supabase from "../../SupabaseClient";
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
  const res = await fetch(`${API_URL_SB}/Order?id=eq.${id}`, {
    headers: {
      apikey: API_KEY_SB,
      Authorization: `Bearer ${API_KEY_SB}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });

  if (!res.ok) {
    throw new Error(`Couldn't find order #${id}`);
  }

  const data = await res.json();

  // Supabase returns an array even for single row queries
  if (data.length === 0) {
    throw new Error(`Order #${id} not found`);
  }

  return data[0]; // Return the first order (it should be the correct one)
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL_SB}/Order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY_SB,
        Authorization: `Bearer ${API_KEY_SB}`,
        Prefer: "return=representation",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Supabase Error:", errorText);
      throw new Error("Failed creating your order");
    }

    const data = await res.json();
    return data[0]; // Supabase returns array of inserted rows
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
