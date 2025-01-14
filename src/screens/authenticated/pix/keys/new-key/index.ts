import { Confirmation } from "./confirmation";
import { Home as CPFHome } from "./cpf/home";
import { Portability } from "./portability";
import { Home as RandomHome } from "./random/home";

const CPF = {
  Home: CPFHome,
};

const Random = {
  Home: RandomHome,
};

export const New = {
  CPF,
  Random,
  Portability,
  Confirmation,
};
