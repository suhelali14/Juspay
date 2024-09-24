import React, { useEffect, useState } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ stream }) {

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


  return (
    <div className="flex-1 h-full overflow-auto">
      <div className="inline-block bg-blue-400 rounded px-3 py-1 text-sm font-bold text-white-700 ml-2 my-2">
        {"Preview Area"}
      </div>
      <button
        className="bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer shadow-sm ml-2 mb-3"
        onClick={addblock}>
        Add block
      </button>
      <div className="p-4">
        <div className="sprites">
          <CatSprite stream={stream} />

        </div>
      </div>
    </div>

  );
}