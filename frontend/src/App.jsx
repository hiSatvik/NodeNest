import { useState } from "react"
import TagView from "./components/tree/TagView"
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

  console.log("App is rendring the tree", tree);
  return (
    <>

      <button
      onClick={() => setTree(intialTree)}
      className="bg-red-500 text-white px-4 py-1 text-sm border border-red-600 shadow-sm hover:bg-red-600 cursor-pointer">
        Rest
      </button>
      <TagView tag={tree}
        onUpdate={(newtree) => setTree(newtree)} />

      <ExportButton tree={tree}/>
    </>
  )
}