import React, { useState, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function MainPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setFileName(files[0].name);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  function onBrowseClick() {
    inputRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md text-center px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          New Chat Session
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Upload a document to start
        </p>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="border border-gray-200 rounded-xl p-8 shadow-sm cursor-pointer"
          style={{ background: "#ffffff" }}
        >
          <div className="flex flex-col items-center gap-4">

            <div className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
              <CloudUploadIcon style={{ fontSize: 48, color: "#111827" }} />
            </div>

            <div>
              <p className="text-lg font-medium text-gray-800">
                Drag and drop your file
              </p>
              <p className="text-sm text-gray-500 mt-2">
                or{" "}
                <button
                  onClick={onBrowseClick}
                  className="underline"
                >
                  click to browse
                </button>{" "}
                from your computer
              </p>
            </div>

            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={onFileChange}
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            disabled={!fileName}
            className={`w-full py-3 rounded-full border ${
              fileName
                ? "bg-white hover:shadow-lg"
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
            }`}
            style={{ borderColor: "#111827" }}
            onClick={() =>
              alert(
                fileName
                  ? `Starting chat with ${fileName}`
                  : "Please upload a file"
              )
            }
          >
            <span className="text-sm font-medium">Start Chat Session</span>
          </button>

          {fileName && (
            <p className="text-xs text-gray-500 mt-3">
              Selected file:{" "}
              <span className="font-medium">{fileName}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}