// import { createContext } from "react";




// export interface ProductContextProps{
//     counter: number,
//     increaseBy: (value: number) => void;
//     product: any

// }


// export const ProductContext = createContext({} as ProductContextProps );
// const { Provider } = ProductContext; // Proveedor de informacion


// const ClubProvider = () => {

//     const {counter, increaseBy, product} = useProduct( {onChange, product, value} )


//     return (
//         <Provider value={{
//             counter,
//             increaseBy,
//             product
//         }}>
            
//             <div className={`${styles.productCard} ${className} `}
//                 style={style}
//             >
//             {children}
//         </div>
//       </Provider>
//   )
// }



// export default ClubProvider


import { createContext, useState } from "react";
import useAxios from "../../component/axios/hooks/useAxios";
import { IMethods, ObjectFetchAxios } from "../../component/axios/interfaces/interfaces";
import { ProviderGeneralProps } from "./interfaces/interface";

//?  Context
export interface ClubContextProps {
    // Todo => Será solo objectListProps
    title: string,
    className?: string,
    url: string,
    urlSchemaForm: string,
    
    // Methods
    // searchPlacesByTerm: (query: string) => Promise<Feature[]>;
    createNew : () => void,
    getById : () => void,
    getAll : () => void,
    deleteById : () => void,
    edit: () => void,
    
    club: any;
    clubs: any[];  

    state: any
}

const ClubContext = createContext<ClubContextProps>({} as ClubContextProps );


// const INITIAL_STATE: ClubState = {
//     isLoading: true,
//     title: "Club List",
//     className: "col-span-2",
//     url: `${import.meta.env.VITE_API_URL}/clubs`,
//     urlSchemaForm: `${import.meta.env.VITE_API_URL}/schemaClub`,
//     clubs:    [
//         {
//             title: "Club List",
//             className: "col-span-2",
//             url: `${import.meta.env.VITE_API_URL}/clubs`,
//             urlSchemaForm: `${import.meta.env.VITE_API_URL}/schemaClub`
//         },        
//     ]
// }


const ClubProvider = ({ children }: ProviderGeneralProps) => {

    const { handleSubmit, state } = useAxios()
    
    const [club, setClub] = useState({});
    const [clubs, setClubs] = useState<any>([]);

    const url = `${import.meta.env.VITE_API_URL}/club`;

    const createNew = async (data: any, functionName: string) => {
        const objectFetch = new ObjectFetchAxios(url, IMethods.POST, data, functionName)
        handleSubmit(objectFetch)
    }

    const getAll = async (functionName: string) => {
        const objectFetch = new ObjectFetchAxios(url, IMethods.GET, "", functionName)
        handleSubmit(objectFetch)
        .then((response) => setClubs(response) )
    }


    const getById = async (id: any, functionName: string) => {
        const objectFetch = new ObjectFetchAxios(`${url}/${id}`, IMethods.GET, "", functionName)
        handleSubmit(objectFetch)
    }


    const deleteById = async (id: any, data: any, functionName: string) => {
        const objectFetch = new ObjectFetchAxios(`${url}/${id}`, IMethods.DELETE, data, functionName)
        handleSubmit(objectFetch)
    }


    const edit = async (data: any, functionName: string) => {
        const objectFetch = new ObjectFetchAxios(`${url}/id`, IMethods.POST, data, functionName)
        handleSubmit(objectFetch)
    }
        return (
        <ClubContext.Provider value={{
            ...state,
            state,
            club,
            clubs,
            // Methods
            createNew,
            getById,
            getAll,
            deleteById,
            edit,
            // function
        }}>
            { children }
        </ClubContext.Provider>
    )
}


export { ClubProvider };
export default ClubContext

    // const [state, dispatch] = useReducer(axiosReducer, INITIAL_STATE);
