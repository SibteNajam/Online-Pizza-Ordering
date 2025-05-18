// export async function getAddress({ latitude, longitude }) {
//   const res = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
//   );
//   if (!res.ok) throw Error("Failed getting address");

//   const data = await res.json();
//   return data;
// }


const API_KEY = '6b83c9262b8b45b183613d483a8f6a29';

export async function getAddress({ latitude, longitude }) {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
  );
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Could not get address");
  }

  const components = data.results[0].components;

  return {
    road: components.road || '',
    city: components.city || components.town || components.village || '',
    locality: components.suburb || components.neighbourhood || '',
    postcode: components.postcode || '',
    countryName: components.country || '',
  };
}
