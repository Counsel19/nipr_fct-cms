import { CloudUpload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

import { FC } from "react";

interface FileUploadProps {
  setFile: (file: File) => void;
  accept?: string;
}

const FileUpload: FC<FileUploadProps> = ({
  setFile,
  accept = ".svg, .png, .jpg, .jpeg, .gif",
}) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });
  return (
    <div className=" rounded-lg text-base  w-full">
      <div
        {...getRootProps()}
        className="border border-1  w-full border-gray-300 rounded-lg p-6 text-center mb-8"
      >
        <div className=" cursor-pointer mb-8 space-y-8 flex flex-col items-center">
          <div className="p-6 rounded-full bg-slate-200 w-fit ">
            <CloudUpload />
          </div>
          <div className="font-normal text-base">
            <input {...getInputProps()} accept={accept} />
            {isDragActive ? (
              <p className="font-semibold ">Drop Files Here...</p>
            ) : acceptedFiles.length === 0 ? (
              <>
                <p>
                  <span className="font-semibold ">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-[1.2rem] font-normal text-gray-400">
                 {accept}
                </p>
              </>
            ) : (
              <>
                <p title="click to change" className="font-semibold ">
                  {acceptedFiles[0].name}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
