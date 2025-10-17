//createContext: To create context objects, allowing you to share data between components without prop drilling.
//useReducer: A hook for managing state using reducers
import React,{createContext,useContext,useReducer} from 'react'
//instead of usestate we use usereducer bcz otherwise we have to make state for every card
/*
A reducer is simply a function that takes:
Current state
Action
And returns a new state based on that action.
*/
const CartStateContext=createContext();
const CartDispatchContext=createContext();
/*
Creates two contexts:
One to hold the cart state.
One to update the cart state.
*/

const reducer =(state,action)=>
{
    switch(action.type)
    {
        case "ADD":
            return [...state,
                {id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
        case "REMOVE":
            let newArr=[...state]
            newArr.splice(action.index,1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
                console.log("Error in Reducer");
    }

}

export const CartProvider=({children})=>
{
    const [state,dispatch]=useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
                </CartStateContext.Provider>
                </CartDispatchContext.Provider>
    )
}

export const useCart=()=>useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);

//To avoid prop drilling (passing props down multiple levels).we use context