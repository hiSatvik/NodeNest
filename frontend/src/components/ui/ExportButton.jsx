import { useState } from 'react';
import { extractCleanTree } from '../../utils/treeutils';

export default function ExportButton({ tree }) {
    const [exportedJson, setExportedJson] = useState("");

    const handleExport = () => {
        const cleanTree = extractCleanTree(tree);
        
        const jsonString = JSON.stringify(cleanTree, null, 2); 
        
        setExportedJson(jsonString);

    };

    return (
        <div className="mt-6">
            <button
                onClick={handleExport}
                className="bg-gray-200 text-black px-4 py-1 text-sm border border-gray-400 shadow-sm cursor-pointer"
            >
                Export
            </button>

            {exportedJson && (
                <pre className="mt-4 p-4 bg-gray-50 border border-gray-300 text-xs overflow-auto w-full max-w-3xl">
                    {exportedJson}
                </pre>
            )}
        </div>
    );
}