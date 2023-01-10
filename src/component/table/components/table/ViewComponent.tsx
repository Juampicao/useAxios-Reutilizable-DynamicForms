import { CustomLogger } from "../../../axios/helpers/CustomLogger";
import { BotonSubmit } from "../atoms/botones/Botones";
import { ObjectProps } from "./ListComponent";

const customLogger = new CustomLogger();

interface Props{
  object: any,
  [x: string]: any;
}

const ViewComponent = ({ object, deleteFn }: Props) => {


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


  return (
    <>
       <tr
      >
        {
          array.map((objectKeys) => (
              <td key={objectKeys.id}> { objectKeys} </td>
          ))
        }
        <td className=" ">
          <BotonSubmit value="Eliminar" onClick={() => handleDelete(object.id)} className="delete" type={"button"} />
        </td>
      </tr>
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