import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {BurgerConstructor} from "components/burger-constructor";
import {BurgerIngredients} from "components/burger-ingredients";
import {Main} from "components/main";

export const Constructor: FC = () => {
  return (
    <Main title="Собери бургер">
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </Main>
  );
}
