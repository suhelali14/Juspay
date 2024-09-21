import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function App() {
  const [stream, setStreams] = useState([]);
  const [history, setHistory] = useState([])
  const [newValues, setNewValues] = useState({});

  const indivClick = (action, value) => {
    if (!newValues["block-100"]) {
      newValues["block-100"] = [];
    }
    getIndivstream(action, value)
    setStreams(newValues["block-100"]);
  }
  function getIndivstream(action, value) {
    newValues["block-100"] = [];
    newValues["block-100"].push({
      key: `${action}`.split("-")[0],
      value: value,
    });
  }

  const [blocks, setBlocks] = useState([
    {
      id: "block-1",
      actions: [],
    },
  ]);



  const dragEvent = (actionEvent) => {
    if (!actionEvent.destination) return;

    const destinationblockId = actionEvent.destination.droppableId;
    const draggableId = actionEvent.draggableId.split("-")[0];

    const updatedblocks = blocks.map((block) => {
      if (block.id === destinationblockId) {
        return {
          ...block,
          actions: [
            ...block.actions,
            `${draggableId}-${block.actions.length}`,
          ],
        };
      }
      return block;
    });
    setBlocks(updatedblocks);
  };

  return (
    <div className="bg-blue-400 font-sans">
      <div className="h-screen overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl rounded-br-xl md:mr-2">
          <DragDropContext onDragEnd={dragEvent}>
            <Sidebar />
            <MidArea
              blocks={blocks}
              setBlocks={setBlocks}
              setStreams={setStreams}
            />
          </DragDropContext>
        </div>
        <div className="w-full md:w-3/6 h-screen overflow-hidden flex flex-col bg-white border-t border-l border-gray-200 rounded-tl-xl rounded-bl-xl md:rounded-tr-xl md:rounded-br-xl md:flex-row">
          <div className="w-full md:w-full h-1/2 md:h-full">
            <PreviewArea stream={stream}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}

