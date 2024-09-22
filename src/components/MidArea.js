import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { componentSelection } from "./componentSelection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function MidArea({
  blocks,
  setBlocks,
  setStreams,
}) {

  const addblock = () => {
    const newblockId = `block-${blocks.length + 1}`;
    setBlocks([...blocks, { id: newblockId, actions: [] }]);
  };

  const deleteblock = (blockId) => {
    setBlocks(l => l.filter(item => item.id !== blockId))
  }
  const handleDelete = (blockId, index) => {
    const block = blocks.find((c) => c.id === blockId);

    if (block && block.actions.length > index) {
      block.actions.splice(index, 1);
      setBlocks([...blocks]);
    }
  };

  const [newValues, setNewValues] = useState({});

  const indivClick = (blockId, action) => {
    if (!newValues[blockId]) {
      newValues[blockId] = [];
    }
    getIndivStream(blockId, action)
    setStreams(newValues[blockId]);
  }

  function getIndivStream(blockId, action) {
    newValues[blockId] = [];

    document.querySelectorAll(`#${blockId} .actionblock`).forEach((actionblock) => {
      const inputs = actionblock.querySelectorAll("input");

      inputs.forEach((input) => {

        const n = 0;
        if (input.className.includes(action)) {
          if (input.type === "text") {
            if (input.id === "repeat") {
              n = input.value;
            }

            if (!isNaN(input.value)) {
              newValues[blockId].push({
                key: `${input.id}`,
                value: parseFloat(input.value),
              });
            } else if (input.type === "text" && input.id === "repeat") {
              for (let i = 0; i < n; i++) {
                newValues[blockId].push({
                  key: `${input.id}${i}`,
                  value: parseFloat(input.value),
                });
                for(let j=0;j<i;j++){
                  newValues[blockId].push({
                    key: `${input.id}${i}`,
                    value:newValues[j].value,
                  });
                }
              }
            } else {
              newValues[blockId].push({
                key: `${input.id}`,
                value: input.value,
              });
            }
          } else if (input.type === "number") {
            newValues[blockId].push({
              key: `${input.id}`,
              value: parseFloat(input.value),
            });
          }
        }
      });
    });

  }
  const runClick = (blockId) => {

    if (!newValues[blockId]) {
      newValues[blockId] = [];
    }

    getStream(blockId);
    setStreams(newValues[blockId]);
  };

  function getStream(blockId) {
    newValues[blockId] = [];

    document.querySelectorAll(`#${blockId} .actionblock`).forEach((actionblock) => {
      const inputs = actionblock.querySelectorAll("input");

      inputs.forEach((input) => {
        var n = 0;
        if (input.type === "text") {
          if (input.id === "repeat") {
            
            n=parseInt(input.value);
            console.log("We have repeat comp: "+n);
          }
          console.log("We are in text");
          if (input.type === "text" && input.id === "repeat") {
            for (let i = 0; i < n; i++) {
              newValues[blockId].push({
                key: `${input.id}${i}`,
                value: parseFloat(input.value),
                
              });
              console.log("We are in the loop");
            }
          } else if (!isNaN(input.value)) {
            newValues[blockId].push({
              key: `${input.id}`,
              value: parseFloat(input.value),
            });
          } else {
            newValues[blockId].push({
              key: `${input.id}`,
              value: input.value,
            });
          }
        } else if (input.type === "number") {
          newValues[blockId].push({
            key: `${input.id}`,
            value: parseFloat(input.value),
          });
        }
        console.log(newValues);
        
      });
    });
  }

  return (
    <div className="flex-1 h-full overflow-auto">
      <div className="inline-block bg-blue-400 rounded px-3 py-1 text-sm font-bold text-white-700 ml-2 my-2">
        {"Midarea"}
      </div>

      <button
        className="bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer shadow-sm ml-2 mb-3"
        onClick={addblock}>
        Add block
      </button>

      {blocks.map((block) => (
        <Droppable
          key={block.id}
          droppableId={block.id}
          type="sidearea"
        >

          {(provided) => (
            <ul
              id={block.id}
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-gray-100 p-5 m-2 rounded-lg shadow-md w-72 min-h-48 overflow-y-auto flex flex-col"
            >
              <span
                className="text-red-500 cursor-pointer flex ml-auto items-center mb-4"
                onClick={() => deleteblock(block.id)}
              >
                Delete Animation 
              </span>
              <button
                className="bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer shadow-sm ml-2 mb-3"
                onClick={() => runClick(block.id)}
              >
                Run Animation
              </button>
              {block.actions.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div className="actionblock" style={{ display: "flex" }}>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ flex: 1 }}
                      >

                        {componentSelection(item.split("-")[0], item)}
                      </div>
                      <span
                        className="text-green-600 cursor-pointer flex items-center mr-2"
                        onClick={() => indivClick(block.id, item)}><FontAwesomeIcon icon={faCheck} /></span>
                      <span

                        className="text-red-500 cursor-pointer flex items-center"

                        onClick={() => handleDelete(block.id, index)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      ))
      }
    </div >
  );
}
