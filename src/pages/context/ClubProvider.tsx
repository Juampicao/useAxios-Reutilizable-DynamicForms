
import { createContext, useState } from "react";
import { CustomLogger } from "../../component/axios/helpers/CustomLogger";
import useAxios from "../../component/axios/hooks/useAxios";
import { IMethods, ObjectFetchAxios } from "../../component/axios/interfaces/interfaces";
import { ObjectListProps } from "../interfaces/Interfaces";
import { ProviderGeneralProps } from "./interfaces/interface";

const customLogger = new CustomLogger()
//?  Context
export interface ClubContextProps {
    // Todo => Será solo objectListProps
    title: string,
    className?: string,
    url: string,
    urlSchemaForm: string,
    
    // Methods
    // searchPlacesByTerm: (query: string) => Promise<Feature[]>;
    createNew : (data: any, functionName: string) => void,
    getById : () => void,
    getAll : () => any,
    deleteById : () => void,
    edit: () => void,
    getCustomSchema: (url: string) => any;
    
    club: any;
    clubs: any[]; 
    data: any;
    cargando: boolean; 
    state: any
    customSchema: any;
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


const INITIAL_STATE = 
{      
    title: "Club List",
    className: "col-span-2",
    url: `${import.meta.env.VITE_API_URL}/clubs`,
    urlSchemaForm: `${import.meta.env.VITE_API_URL}/schemaClub`
}

const ClubProvider = ({ children }: ProviderGeneralProps) => {

    const { handleSubmit, state } = useAxios()
    
    const [club, setClub] = useState<ObjectListProps>(INITIAL_STATE);
    const [data, setData] = useState<any>([]);
    const [cargando, setCargando] = useState(true); 
    const [customSchema, setCustomSchema] = useState({});
    
    const url = `${import.meta.env.VITE_API_URL}/clubs`;


    async function getCustomSchema(urlSchemaForm: string) {
        customLogger.logDebug("GetCustomSchema: urlSchemaForm:",urlSchemaForm)
        const objectFetch = await new ObjectFetchAxios(`${import.meta.env.VITE_API_URL}/schemaClub`, IMethods.GET, "", "getCustomShemaData, FormComponent")
        await handleSubmit(objectFetch)
            .then(() => customLogger.logDebug("ClubProvider, getCustomSchema", state.respuestaAPI.data))
            .then(() => setCustomSchema((state.respuestaAPI.data)))
            .then(() => setCargando(false))
    }

    const createNew = async (data: any, functionName: string) => {
        const objectFetch = new ObjectFetchAxios(url, IMethods.POST, data, functionName)
        handleSubmit(objectFetch)
    }

    const getAll = async (functionName: string) => {
        const objectFetch = new ObjectFetchAxios(url, IMethods.GET, "", functionName)
        await handleSubmit(objectFetch)
            .then(() => customLogger.logDebug("ClubProvider, getAll", state.respuestaAPI.data))
            .then(() => setData((state.respuestaAPI.data)))
            .then(() => setCargando(false))
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
            data,
            cargando,
            customSchema,
            // Methods
            createNew,
            getById,
            getAll,
            deleteById,
            edit,
            getCustomSchema,
        }}>
            { children }
        </ClubContext.Provider>
    )
}


export { ClubProvider };
export default ClubContext

// const [state, dispatch] = useReducer(axiosReducer, INITIAL_STATE);
