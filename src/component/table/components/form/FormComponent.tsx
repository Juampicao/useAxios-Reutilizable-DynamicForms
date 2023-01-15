import { useEffect, useState } from "react";
import { CustomLogger } from "../../../axios/helpers/CustomLogger";
import useAxios from "../../../axios/hooks/useAxios";
import { IMethods, ObjectFetchAxios } from "../../../axios/interfaces/interfaces";
import { DynamicForm } from "../../../forms/pages";
import Spiner from "../atoms/spiner/Spiner";

const customLogger = new CustomLogger();

interface Props{
  urlSchemaForm: string,
  className?:string,
}
const FormComponent = ({ urlSchemaForm, className }: Props) => {
  
  const { handleSubmit, state } = useAxios()
  const { loading, respuestaAPI, errorAPI } = state;

  const [localLoading, setLocalLoading] = useState(true)
  
  const getCustomSchema1 = new ObjectFetchAxios(urlSchemaForm, IMethods.GET, "", "getCustomShemaData, FormComponent")

  useEffect(() => {
    
    if (urlSchemaForm) {
      customLogger.logDebug(`UrlSchemaForm: ${urlSchemaForm}, FormComponent`)
      try {
        handleSubmit(getCustomSchema1)
        .then(() => setLocalLoading(false))
        
      } catch (error) {
        customLogger.logError("getCustomShema,FormComponent", error)
      }
    }
  }, [])
  

  
  return (
    <>

      {
        localLoading ?
          <Spiner/> :
          <>
            <DynamicForm customShema={respuestaAPI.data} />

          </>
      }
      </>
      )
}

export default FormComponent

// import { useEffect, useState } from "react";
// import { CustomLogger } from "../../../axios/helpers/CustomLogger";
// import useAxios from "../../../axios/hooks/useAxios";
// import { IMethods, ObjectFetchAxios } from "../../../axios/interfaces/interfaces";
// import { DynamicForm } from "../../../forms/pages";
// import Spiner from "../atoms/spiner/Spiner";

// const customLogger = new CustomLogger();

// interface Props{
//   urlSchemaForm: string,
//   className?:string,
// }
// const FormComponent = ({ urlSchemaForm, className }: Props) => {
  
//   const { handleSubmit, state } = useAxios()
//   const { loading, respuestaAPI, errorAPI } = state;
  
//   const [cargando, setCargando] = useState(true)
//   const [localSchema, setLocalSchema] = useState({})
//   const [localLoading, setLocalLoading] = useState(true)
  
//   async function getCustomSchema(urlSchemaForm: string) {
//     customLogger.logDebug("GetCustomSchema: urlSchemaForm:",urlSchemaForm)
//     const objectFetch = await new ObjectFetchAxios(`${import.meta.env.VITE_API_URL}/schemaClub`, IMethods.GET, "", "FormComponent, objectFetch")
//     handleSubmit(objectFetch)
//       .then(() => customLogger.logDebug("FormComponent, PRUEBA DATA ", state.respuestaAPI.data))
//       .then(() => setLocalSchema((state.respuestaAPI.data)))
//       .then(() => setCargando(false))
//   }
//   useEffect(() => {
    
//     if (urlSchemaForm) {
//       getCustomSchema(urlSchemaForm).then(() => setLocalLoading(false))
//     }
//   }, [])


//   return (
//     <>

//       {
//         localLoading ?
//           <Spiner/> :
//           <>
//             <DynamicForm customShema={localSchema? localSchema : ""} />
//           </>
//       }
//       </>
//       )
// }

// export default FormComponent


// Todo problema: Se carga bien cuando refresco el componente individual. Sino me salta undefiend
// Todo: Si guardas cambios en FormComponent, en el primer render. Tira error. Algo sucede.