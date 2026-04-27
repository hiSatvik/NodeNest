import { useState, useEffect } from "react";
import axios from "axios";
import TagView from "./components/tree/TagView";
import ExportButton from "./components/ui/ExportButton";

const intialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: "c1-c1 Hello" },
        { name: 'child1-child2', data: "c1-c2 JS" }
      ]
    },
    { name: 'child2', data: "c2 World" }
  ]
}

export default function App() {
  const [tree, setTree] = useState(intialTree);
  const [savedTrees, setSavedTrees] = useState([]); 

  const [activeTreeId, setActiveTreeId] = useState();

  useEffect(() => {
    fetchSavedTrees()
  }, [])

  const fetchSavedTrees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/trees");
      console.log("Fetched trees from DB:", response.data.trees);
      setSavedTrees(response.data.trees);
    } catch (error) {
      console.error("Oh no, failed to fetch trees:", error);
    }
  }

  const handleReset = () => {
    setTree(intialTree);
    setActiveTreeId(null);
  }

  return (
    <>
      <div className="p-8 max-w-5xl mx-auto flex flex-col gap-12">

        {/* SECTION 1: The Main Editor */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-700">
              {activeTreeId ? "Editing Tree Save" : "New Tag Tree Editor"}
            </h1>
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-1 text-sm border border-red-600 shadow-sm hover:bg-red-600 cursor-pointer">
              Reset Tree
            </button>
          </div>
          
          <TagView 
            tag={tree}
            onUpdate={(newtree) => setTree(newtree)} 
          />
          <ExportButton tree={tree} activeTreeId={activeTreeId}/>
        </div>

        {/* SECTION 2: The Saved trees gallery */}
        {savedTrees.length > 0 && (
          <div className="border-t-2 border-gray-200 pt-8 mt-4">
            <h2 className="text-lg font-bold text-gray-700 mb-6">Previously Saved Trees</h2>

            <div className="flex flex-col gap-8">
              {savedTrees.map((savedItem, index) => (
                <div key={index} className="p-4 bg-gray-50 border border-gray-300 rounded-md">
                  <p className="text-xs text-gray-500 mb-2 font-mono">Tree #{index + 1}</p>

                  {/* Load Button */}
                  <button
                  onClick={() => {
                    setTree(savedItem.tree);
                    setActiveTreeId(savedItem.id)
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  }} className="bg-blue-500 text-white px-3 py-1 text-xs border-blue-600 cursor-pointer">
                    Load into Editor
                  </button>

                  {/* Reusing TagView! */}
                  <TagView
                    tag={savedItem.tree}
                    onUpdate={() => alert("Please load tree into main editor and change it")}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}