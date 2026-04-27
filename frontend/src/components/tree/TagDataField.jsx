export default function TagDataField({value, onChange}) {
    return (
        <div className="flex items-center bg-gray-100 p-1 border-gray-300">
            <span className="text-gray-500 text-xs px-2">Data</span>
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-white px-2 py-1 text-sm border border-gray-200 outline-none focus:border-blue-400" />
        </div>
    )
}