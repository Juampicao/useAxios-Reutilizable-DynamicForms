import { useContext } from "react";
import ClubContext from "../context/ClubProvider";


const useClubList = () => {
  return useContext(ClubContext);
};

export default useClubList;
