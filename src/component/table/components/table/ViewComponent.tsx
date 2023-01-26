import { CustomLogger } from "../../../axios/helpers/CustomLogger";
import useAxios from "../../../axios/hooks/useAxios";
import { BotonSubmit } from "../atoms/botones/Botones";
import Spiner from "../atoms/spiner/Spiner";
import { ObjectProps } from "./ListComponent";

const customLogger = new CustomLogger();

interface Props{
  object: any,
  [x: string]: any;
  deleteFn: (id: number) => void,
  createFn: (data: any, functionName: string) => any; 
}

const ViewComponent = ({ object, deleteFn, createFn }: Props) => {

  const {  state } = useAxios();
  const { loading, respuestaAPI } = state;

  let array : ObjectProps[]= Object.values(object)

  // HandleDelete
  function handleDelete(id : number) {
    customLogger.logDebug("HandleDelete", id)
    let confirmar = confirm(
      `¿Seguro deseas eliminar a\n${object.id}?`
    );
    if (confirmar) {
      deleteFn(id)
    }
  }

  // HandleCreate
  function HandleCreate(data : any) {
    createFn(data, "")
  }


  return (
    <>
      {
        loading ? <Spiner /> : 
          
       <tr
      >
        {
          array.map((objectKeys) => (
              <td key={objectKeys.id}> { objectKeys} </td>
          ))
        }
        <td className=" gap space-x-3">
          <BotonSubmit value="Eliminar" onClick={() => handleDelete(object.id)} className="bg-red-500" type={"button"} />

          <BotonSubmit value="Editar" onClick={() => HandleCreate(object)} className="bg-green-500" type={"button"} />

        </td>
          </tr>
      }
      
    </>
  )
}

export default ViewComponent


      // className={`${estadoPedidosObject[estado].color} border border-1 border-slate-400`}


{/* <div className=" ">
<BotonVer
  value="Ver"
  onClick={() => navigate(`/presupuestos/ver/${_id}`)}
/>
<BotonEditar value="Editar" onClick={() => openEditForm()} />

<BotonEliminar value="Eliminar" onClick={() => handleDelete(id)} />
</div> */}