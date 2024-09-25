import React, { useState, useEffect } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ stream }) {
  const [globalactive, setActiveGlobal] = useState("Sprite0");
  const [characters, setCharacters] = useState([
    {
      id: "block-1",
      position: { x: 0, y: 0 },
      name: "Sprite0",
      width: 95.18,   // Add width from your SVG
      height: 100.04   // Add height from your SVG
    }
  ]);
  const [active, setActive] = useState("Sprite0"); // Set default active character

  const handleChange = (e) => {
    setActive(e.target.value);
    setActiveGlobal(e.target.value);
  };

  const addCharacter = () => {
    const newCharacterId = `block-${characters.length + 1}`;
    const newSpriteName = `Sprite${characters.length}`;
    
    setCharacters((prevCharacters) => [
      ...prevCharacters,
      {
        id: newCharacterId,
        position: { x: 0 * (characters.length + 1), y: 110* (characters.length + 1) },
        name: newSpriteName,
        width: 95.18, // Use the same width as before
        height: 100.04 // Use the same height as before
      }
    ]);
    
    setActive(newSpriteName);
    setActiveGlobal(newSpriteName);
  };

  useEffect(() => {
    if (characters.length > 0) {
      setActive(characters[characters.length - 1].name);
      setActiveGlobal(characters[characters.length - 1].name);
    }
  }, [characters]);

  return (
    <div className="flex-1 h-full overflow-auto relative">
      <div className="inline-block bg-blue-400 rounded px-3 py-2 text-sm font-bold text-white-700 ml-2 my-2">
        {"Preview Area"}
      </div>
      <div className="inline-block bg-green-300 rounded px-3 py-1 text-sm font-bold text-white-700 ml-2 my-2">
        {"Add Character ➡️"}
        <select 
         name="addchar"
         id="AddChar" 
         className="inline-block bg-blue-400 rounded px-3 text-sm font-bold text-white-700 ml-2 my-1"
         value={active}
         onChange={handleChange}
        >
          {characters.map((character) => {
            const name = character.name.charAt(0).toUpperCase() + character.name.slice(1);
            return (
              <option key={character.id} value={character.name}>
                {name}
              </option>
            );
          })}
        </select>
        <button
          className="bg-yellow-600 text-white px-2 py-1 rounded-md cursor-pointer shadow-sm ml-2"
          onClick={addCharacter}
        >
          Add Character
        </button>
      </div>

      <div className="p-4">
        <div className="sprites">
          {characters.map((character) => (
            <CatSprite
              key={character.id}
              stream={stream}
              position={character.position}
              globalactive={globalactive}
              name={character.name}
              characters={characters} // Pass updated characters array
              width={character.width} // Pass width
              height={character.height}
              setCharacters={setCharacters} // Pass height
            />
          ))}
        </div>
      </div>
    </div>
  );
}
