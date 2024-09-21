import React from "react";
import ShiftToX from "./Options/ShiftToX";
import ShiftToY from "./Options/ShiftToY";
import JumpTo from "./Options/JumpTo";
import JumpToRandom from "./Options/JumpToRandom";
import RotateAngle from "./Options/RotateAngle";
import ModifySize from "./Options/ModifySize";
import Loop from "./Options/Loop";
import DefineSize from "./Options/DefineSize";
import Talk from "./Options/Talk";
import TurnCounterclockwise from "./Options/TurnCounterclockwise";
import TurnClockwise from "./Options/TurnClockwise";
import Pause from "./Options/Pause";
import StartFlag from "./Options/StartFlag";
import ModifyColor from "./Options/ModifyColor";
import ModifyBackgroundColor from "./Options/ModifyBackgroundColor";
import JumpToX from "./Options/JumpToX";
import JumpToY from "./Options/JumpToY";
import ResetPosition from "./Options/ResetPosition"

export const componentSelection = (key, id) => {
  switch (key.toUpperCase()) {
    case "SHIFTTOX":
      return <ShiftToX value={id} />;
    case "SHIFTTOY":
      return <ShiftToY value={id} />;
    case "JUMPTO":
      return <JumpTo value={id} />;
    case "JUMPTO_RANDOM":
      return <JumpToRandom value={id} />;
    case "ROTATE_ANGLE":
      return <RotateAngle value={id} />;
    case "TURN_CLOCKWISE":
      return <TurnClockwise value={id} />;
    case "TURN_COUNTERCLOCKWISE":
      return <TurnCounterclockwise value={id} />;
    case "TALK":
      return <Talk value={id} />;
    case "MODIFY_SIZE":
      return <ModifySize value={id} />;
    case "MODIFY_COLOR":
      return <ModifyColor value={id} />;
    case "MODIFY_BG_COLOR":
      return <ModifyBackgroundColor value={id} />;
    case "DEFINE_SIZE":
      return <DefineSize value={id} />;
    case "PAUSE":
      return <Pause value={id} />;
    case "LOOP":
      return <Loop value={id} />;
    case "START_FLAG":
      return <StartFlag value={id} />;
    case "JUMP_TO_X":
      return <JumpToX value={id} />;
    case "JUMP_TO_Y":
      return <JumpToY value={id} />;
      case "RESETPOSITION":
        return <ResetPosition onReset={resetToInitialPosition} />;

  }

};
