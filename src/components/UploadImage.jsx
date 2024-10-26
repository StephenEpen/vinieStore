import React, { useEffect, useState } from "react";

const UploadImage = ({ colorIndex, onFilesChange, productImages }) => {
  const [files, setFiles] = useState(productImages || []);

  useEffect(() => {
    onFilesChange(files);
  }, [files]);

  const handleFilesChange = (newFiles) => {
    const selectedFiles = Array.from(newFiles);
    const updatedFiles = [...files, ...selectedFiles].filter(
      (file, index, self) =>
        index === self.findIndex((f) => f.name === file.name)
    );
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); 
  };

  const removeFile = (fileToRemove) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="p-6 border rounded-lg my-6">
      <div className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
        <input
          type="file"
          id={`hidden-input-${colorIndex}`}
          multiple
          className="hidden"
          onChange={(e) => handleFilesChange(e.target.files)}
          accept="image/*"
        />
        <button
          type="button"
          onClick={() =>
            document.getElementById(`hidden-input-${colorIndex}`).click()
          }
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Upload a file
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-900">To Upload</h3>
        <ul className="flex flex-wrap mt-4 gap-4">
          {files.length > 0 ? (
            files.map((file, index) => (
              <li
                key={index}
                className="relative w-24 h-24 border bg-gray-100 rounded-md flex items-center justify-center"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="absolute top-0 right-0 text-red-600 text-sm"
                >
                  &times;
                </button>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No files selected</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UploadImage;
