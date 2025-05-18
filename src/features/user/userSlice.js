import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,  // ✅ Use this!
      timeout: 10000,
    });
  });
}


// fetch info of user addres 
//two steps

// this fetch addres is now action creator function

//1st agrgumnet is action type name
//2d argument actual thunk function


// this create async produce three action types
// 1 pending
// 2 fulfilled
// 3 rejected

// handle these cases in our reducers
export const fetchAddress = createAsyncThunk('user/fetchAddres', async function () {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
})

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {  // ✅ correct: `reducers` with an 's'
    updateName(state, action) {
      state.username = action.payload;
    }
  },
  extraReducers: (builder) => builder.addCase(
    fetchAddress.pending, (state) => { state.status = 'loading' })
    .addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = 'idle';
      state.position = action.payload.position;
      state.address = action.payload.address;
    })
    .addCase(fetchAddress.rejected, (state, action) => {
      state.status = 'failed'; state.error = action.error.message;
    }),
});
export const getUserName = state => state.user.username;
export const { updateName } = userSlice.actions;
export default userSlice.reducer;  //export the reducer to be used in the store









