import { useContext } from "react";
import ClubContext from "../context/ClubProvider";

const useClub = () => {
  return useContext(ClubContext);
};

export default useClub;