import { createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name : 'data',
    initialState : [],
    reducers : {
        addUser(state,action){
            state.concat(action.payload)
            console.log("Dataaaaaaaaaaaaaa     ",action.payload)
        }
    }
})

export const {addUser} = dataSlice.actions;

export default dataSlice.reducer