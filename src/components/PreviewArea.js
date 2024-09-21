import React, { useEffect, useState } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ stream }) {

  return (
    <div className="flex-1 h-full overflow-auto">
      <div className="inline-block bg-blue-400 rounded px-3 py-1 text-sm font-bold text-white-700 ml-2 my-2">
        {"Preview Area"}
      </div>

      <div className="p-4">
        <div className="sprites">
          <CatSprite stream={stream} />

        </div>
      </div>
    </div>

  );
}