import { useState } from 'react';
import axios from 'axios';
import { extractCleanTree } from '../../utils/treeUtils';

export default function ExportButton({ tree, activeTreeId }) {
    const [exportedJson, setExportedJson] = useState("");

    const handleExport = async () => {
        // 1. Scrub it clean and show it on the UI
        const cleanTree = extractCleanTree(tree);
        const jsonString = JSON.stringify(cleanTree, null, 2);
        setExportedJson(jsonString);

        // 2. Send it to our Python Backend with Axios!
        try {
            console.log("Backend request is processing");
            if (activeTreeId) {
                const response = await axios.post(`http://localhost:8000/api/tree/${activeTreeId}`, {
                    tree: cleanTree
                });

                alert("Tree updated! Id: " + response.data.id);
            } else {
                const response = await axios.post("http://localhost:8000/api/tree",{
                    tree: cleanTree
                });
                alert("New Tree is saved: " + response.data.id);
            }
        } catch (error) {
            console.error("The server got error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="mt-6">
            <button
                onClick={handleExport}
                className="bg-gray-200 text-black px-4 py-1 text-sm border border-gray-400 shadow-sm hover:bg-gray-300 cursor-pointer"
            >
                Export & Save
            </button>

            {exportedJson && (
                <pre className="mt-4 p-4 bg-gray-50 border border-gray-300 text-xs overflow-auto w-full max-w-3xl">
                    {exportedJson}
                </pre>
            )}
        </div>
    );
}