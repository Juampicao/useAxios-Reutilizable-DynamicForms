import { useEffect, useState } from "react";
import { CustomLogger } from "../../../axios/helpers/CustomLogger";
import useAxios from "../../../axios/hooks/useAxios";
import { IMethods, ObjectFetchAxios } from "../../../axios/interfaces/interfaces";
import { DynamicForm } from "../../../forms/pages";

const customLogger = new CustomLogger();

interface Props{
  urlSchemaForm: string,
  className?:string,
}
const FormComponent = ({ urlSchemaForm, className }: Props) => {
  
  const { handleSubmit, state } = useAxios()
  
  const [localLoading, setLocalLoading] = useState(true)
  const { loading, respuestaAPI, errorAPI } = state;

    const getCustomSchema = new ObjectFetchAxios(urlSchemaForm, IMethods.GET, "", "getCustomShemaData, FormComponent")

  useEffect(() => {
    if (urlSchemaForm) {
      customLogger.logDebug(`UrlSchemaForm: ${urlSchemaForm}, FormComponent`, "")
      try {
        handleSubmit(getCustomSchema)
        .then(() => customLogger.logDebug("After getCustomShemaData,FormComponent",""))
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
          <p> cargando formComponent..</p> :
          <>
            <DynamicForm customShema={respuestaAPI.data} />
          </>
      }
      </>
      )
}

export default FormComponent


// import { useEffect } from "react";
// import useClub from "../../../../pages/hooks/useClub";
// import { CustomLogger } from "../../../axios/helpers/CustomLogger";
// import useAxios from "../../../axios/hooks/useAxios";
// import { DynamicForm } from "../../../forms/pages";

// const customLogger = new CustomLogger();

// interface Props{
//   urlSchemaForm: string,
//   className?:string,
// }
// const FormComponent = ({ urlSchemaForm, className }: Props) => {
  
//   const { handleSubmit, state } = useAxios()
  
//   const {getCustomSchema, cargando, customSchema} = useClub()
  
//   useEffect(() => {
//     getCustomSchema(urlSchemaForm).then(() => customLogger.logDebug("FormComponent, getCustomSchema", customSchema))
//   }, [])
  
//   return (
//     <>

//       {
//         cargando ?
//           <p> cargando formComponent..</p> : 
//           <>
//             {
//               customSchema? 
//                 <DynamicForm customShema={customSchema} /> 
//                 : 
//                 "No existe la customSchema"
//             }
//           </>
//       }
//       </>
//       )
// }

// export default FormComponent