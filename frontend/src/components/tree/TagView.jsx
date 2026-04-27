import { useState } from "react"
import TagDataField from "./TagDataField";

export default function TagView({ tag, onUpdate }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [isEditingName, setIsEditingName] = useState(false);
    const [editNameValue, setEditNameValue] = useState(tag.name);

    const handleDataChange = (newValue) => {
        onUpdate({ ...tag, data: newValue });
    }

    const handleChildUpdate = (updatedChild, index) => {
        const newChildren = [...(tag.children ?? [])];
        newChildren[index] = updatedChild;
        onUpdate({ ...tag, children: newChildren })
    }

    const handleAddChild = () => {

        console.log("Button Clicked", tag.name)
        const newBaby = { name: "New Child", data: "Data" };
        const { data, ...restTag } = tag;
        const updatedTag = {
            ...restTag,
            children: [...(tag.children ?? []), newBaby],
        };

        onUpdate(updatedTag);
        setIsCollapsed(false);
    }

    const startEditingName = () => {
        setEditNameValue(tag.name);
        setIsEditingName(true);
    }

    const handleNameKeyDown = (e) => {
        if (e.key == "Enter") {
            setIsEditingName(false);

            if (editNameValue.trim() !== "" && editNameValue !== tag.name) {
                onUpdate({ ...tag, name: editNameValue });
            }
        }
    }

    return (
        <div className="ml-4 border border-blue-400 my-1 bg-white">

            {/* Header */}
            <div className="flex items-center justify-between bg-blue-400 text-white px-2 py-1">
                <div className="flex items-center gap-2">
                    <button
                        className="bg-gray-100 text-black px-2 py-0.5 text-xs font-mono cursor-pointer border border-gray-300 shadow-sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? ">" : "v"}
                    </button>

                    {isEditingName ? (
                        <input
                            type="text"
                            value={editNameValue}
                            onChange={(e) => setEditNameValue(e.target.value)}
                            onKeyDown={handleNameKeyDown}
                            onBlur={() => setIsEditingName(false)}
                            className="text-sm text-black px-1 outline-none"
                            autoFocus
                        />
                    ) : (
                        <div
                            className="font-semibold text-sm cursor-pointer hover:underline"
                            onClick={startEditingName}
                        >
                            {tag.name}
                        </div>
                    )}
                </div>

                <button
                    className="bg-gray-100 text-black px-3 py-0.5 text-xs cursor-pointer border border-gray-300 shadow-sm"
                    onClick={handleAddChild}
                >
                    Add Child
                </button>
            </div>

            {!isCollapsed && (
                <div className="p-2 border-t border-blue-400 bg-blue-50/30">

                    {/* Base case */}
                    {tag.data !== undefined && (
                        <TagDataField
                            value={tag.data}
                            onChange={handleDataChange}
                        />
                    )}

                    {/* Recursive case */}
                    {tag.children !== undefined && (
                        <div className="mt-2 flex flex-col gap-1">
                            {tag.children.map((childTag, index) => (
                                <TagView
                                    key={index}
                                    tag={childTag}
                                    onUpdate={(updatedChild) => handleChildUpdate(updatedChild, index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
