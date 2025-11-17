import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

export default function MainPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dragCounter = useRef(0);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setFileName(files[0].name);
  }

  //saat file nya di drop 
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragActive(false);

    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      handleFiles(dt.files);
      dt.clearData();
    }
  }

  //saat kursor ada diatas (sudah masuk)
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  //saat kursor masuk
  function onDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    // klo drag nya gada file
    const dt = e.dataTransfer;
    if (dt && dt.types && !Array.from(dt.types).includes("Files")) return;

    dragCounter.current += 1;
    if (dragCounter.current > 0) {
      setIsDragActive(true);
    }
  }

  //saat kursor keluar
  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    // klo drag nya gada file
    const dt = e.dataTransfer;
    if (dt && dt.types && !Array.from(dt.types).includes("Files")) return;

    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragActive(false);
    }
  }

  function onBrowseClick() {
    inputRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files);
  }

  function onKeyPressWrapper(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  }

  const borderClass = fileName
    ? "border-green-500"
    : isDragActive
    ? "border-blue-400"
    : "border-gray-200";

  const bgClass = isDragActive ? "bg-blue-50" : "bg-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md text-center px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">New Chat Session</h2>
        <p className="text-sm text-gray-500 mb-8">Upload a document to start</p>

        <div
          role="button"
          tabIndex={0}
          onClick={onBrowseClick}
          onKeyDown={onKeyPressWrapper}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`rounded-xl p-8 shadow-sm cursor-pointer border-2 ${borderClass} ${bgClass}`}
          style={{ transition: "border-color 150ms ease, background 150ms ease" }}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                fileName ? "border-green-500" : "border-dashed border-gray-300"
              }`}
              style={{
                borderWidth: 2,
                transition: "transform 150ms ease, border-color 150ms ease, background 150ms ease",
                background: isDragActive ? "rgba(59,130,246,0.06)" : "transparent",
              }}
            >
              {!fileName ? (
                <CloudUploadIcon
                  sx={{
                    fontSize: isDragActive ? 56 : 48,
                    transform: isDragActive ? "translateY(-4px) scale(1.06)" : "none",
                    transition: "transform 180ms ease, font-size 180ms ease, color 150ms ease",
                    color: isDragActive ? "rgb(37,99,235)" : "rgb(17,24,39)",
                    pointerEvents: "none",
                  }}
                />
              ) : (
                <CloudDoneIcon
                  sx={{
                    fontSize: 52,
                    color: "rgb(16,185,129)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            <div>
              <p className="text-lg font-medium text-gray-800">Drag and drop your file</p>
              <p className="text-sm text-gray-500 mt-2">
                or{" "}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBrowseClick();
                  }}
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
          <Button
            fullWidth
            disabled={!fileName}
            onClick={() => alert(fileName ? `Starting chat with ${fileName}` : "Please upload a file")}
            className="w-full py-3 rounded-full"
            sx={{
              border: "1px solid",
              borderColor: "#111827",
              borderRadius: "9999px",
              textTransform: "none",
              paddingY: "0.75rem",
              backgroundColor: fileName ? "#ffffff" : "#f3f4f6", 
              color: fileName ? "inherit" : "rgb(148,163,184)",
              boxShadow: fileName ? "none" : "none",
              "&:hover": {
                boxShadow: fileName ? "0 10px 30px rgba(17,24,39,0.08)" : "none",
                backgroundColor: fileName ? "#ffffff" : "#f3f4f6",
              },
            }}
            disableElevation
          >
            <span className="text-sm font-medium">Start Chat Session</span>
          </Button>

          <p
            className={`text-xs text-gray-500 mt-3 ${fileName ? "" : "invisible"}`}
            aria-hidden={!fileName}
          >
            Selected file: <span className="font-medium">{fileName ?? "placeholder"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}