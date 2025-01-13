import React, { useState } from "react";
import axios from "axios";

const Manuscript = () => {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [workflowResult, setWorkflowResult] = useState(null);
  const user = "difyuser";
  const uploadUrl = "https://api.dify.ai/v1/files/upload";
  const workflowUrl = "https://api.dify.ai/v1/workflows/run";
  const headers = {
    Authorization: "Bearer app-J7NUe1dYy2hGAYxqxLPf8AB3",
    "Content-Type": "application/json",
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        params: {
          user: user,
          type: "TXT",
        },
      });

      if (response.status === 201) {
        console.log("File uploaded successfully");
        setFileId(response.data.id);
      } else {
        console.error(`File upload failed, status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleRunWorkflow = async () => {
    try {
      const requestData = {
        inputs: {
          orig_mail: {
            transfer_method: "local_file",
            upload_file_id: fileId,
            type: "document",
          },
        },
        response_mode: "blocking",
        user: user,
      };

      const response = await axios.post(workflowUrl, requestData, {
        headers: headers,
      });

      if (response.status === 200) {
        console.log("Workflow execution successful");
        setWorkflowResult(response.data);
      } else {
        console.error(
          `Workflow execution failed, status code: ${response.status}`
        );
        setWorkflowResult({
          status: "error",
          message: `Failed to execute workflow, status code: ${response.status}`,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setWorkflowResult({ status: "error", message: error.message });
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-[#04AA6D] text-white py-[16px] px-[20px] cursor-pointer w-24 opacity-80 text-[12px] hover:opacity-100"
        onClick={handleUpload}
      >
        Upload
      </button>

      {fileId && (
        <div>
          <h1>Run Workflow</h1>
          <button
            className="bg-[#04AA6D] text-white py-[16px] px-[20px] cursor-pointer w-24 opacity-80 text-[12px] hover:opacity-100"
            onClick={handleRunWorkflow}
          >
            Run Workflow
          </button>
        </div>
      )}

      {workflowResult && (
        <div>
          <h2>Workflow Result:</h2>
          <pre>{JSON.stringify(workflowResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Manuscript;
