import React, { useRef, useState } from 'react';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloseIcon from "@mui/icons-material/Close";


interface AvailableActionsProps {
  onClose: () => void;
  onSelectAction: (action: string) => void;
  onFileUpload: (fileName: string) => void;
}

const AvailableActions: React.FC<AvailableActionsProps> = ({ onClose, onSelectAction, onFileUpload }) => {
  const actions = [
    'Summarize this text',
    'Fix grammar',
    'Generate ideas',
  ];

  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragCounter = useRef(0);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    setFileName(file.name);
    onFileUpload(file.name);
  }

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

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    const dt = e.dataTransfer;
    if (dt && dt.types && !Array.from(dt.types).includes("Files")) return;

    dragCounter.current += 1;
    if (dragCounter.current > 0) {
      setIsDragActive(true);
    }
  }

  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

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
    ? "border-primary"
    : "border-neutral-300";

  const bgClass = isDragActive ? "bg-blue-50" : "bg-white";


  return (
    <div className="absolute bottom-20 left-12 mb-2 w-full max-w-md bg-white rounded-lg shadow-lg p-4 border border-neutral-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-800">Available Actions</h3>
        <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">
          <span className="sr-only">Close</span>
          <CloseIcon />
        </button>
      </div>
      <div>
        <div
            role="button"
            tabIndex={0}
            onClick={onBrowseClick}
            onKeyDown={onKeyPressWrapper}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`rounded-xl p-4 shadow-sm cursor-pointer border-2 ${borderClass} ${bgClass}`}
            style={{ transition: "border-color 150ms ease, background 150ms ease" }}
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  fileName ? "border-green-500" : "border-dashed border-neutral-300"
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
                      fontSize: isDragActive ? 40 : 32,
                      transform: isDragActive ? "translateY(-2px) scale(1.06)" : "none",
                      transition: "transform 180ms ease, font-size 180ms ease, color 150ms ease",
                      color: isDragActive ? "#3B82F6" : "#1F2937",
                      pointerEvents: "none",
                    }}
                  />
                ) : (
                  <CloudDoneIcon
                    sx={{
                      fontSize: 36,
                      color: "rgb(16,185,129)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>

              <div className="text-center">
                <p className="text-base font-medium text-neutral-800">Drag and drop your file</p>
                <p className="text-xs text-neutral-500 mt-1">
                  or{" "}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBrowseClick();
                    }}
                    className="underline text-primary"
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
        
        <p
            className={`text-xs text-neutral-500 mt-3 ${fileName ? "" : "invisible"}`}
            aria-hidden={!fileName}
        >
            Selected file: <span className="font-medium">{fileName ?? "placeholder"}</span>
        </p>

        <ul className="mt-4">
          {actions.map((action) => (
            <li
              key={action}
              className="p-2 hover:bg-neutral-100 rounded-md cursor-pointer"
              onClick={() => onSelectAction(action)}
            >
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailableActions;

