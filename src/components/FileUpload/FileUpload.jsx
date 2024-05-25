'use client'
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import './FileUpload.css'

import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const FileUpload = () => {
  const inputRef = useRef()

  const [selectedFile, setSelectedFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('select')
  const { data: session } = useSession()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleFileChange = ({ target }) => {
    if (Boolean(target.files) && target.files.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setSelectedFile(target.files[0])
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onChooseFile = () => {
    inputRef.current.click()
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const clearFileInput = () => {
    inputRef.current.value = ''
    setSelectedFile(null)
    setProgress(0)
    setUploadStatus('select')
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleUpload = async () => {
    if (uploadStatus === 'done') {
      clearFileInput()
      return
    }

    try {
      setUploadStatus('uploading')

      const formData = new FormData()
      formData.append('file', selectedFile)

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_GSO}/services/upload`,
        formData,

        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${session.token}`,
          },

          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            )
            setProgress(percentCompleted)
          },
        },
      )

      setUploadStatus('done')
    } catch (error) {
      setUploadStatus('select')
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          <span className="material-symbols-outlined">upload</span> Upload File
        </button>
      )}
      {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
      {selectedFile && (
        <>
          <div className="file-card">
            <span className="material-symbols-outlined icon">description</span>

            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>

                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {uploadStatus === 'select' ? (
                <button onClick={clearFileInput}>
                  <span className="material-symbols-outlined close-icon">
                    close
                  </span>
                </button>
              ) : (
                <div className="check-circle">
                  {uploadStatus === 'uploading' ? (
                    `${progress}%`
                  ) : uploadStatus === 'done' ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '20px' }}
                    >
                      check
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button className="upload-btn z-50" onClick={handleUpload}>
            {uploadStatus === 'select' || uploadStatus === 'uploading'
              ? 'Upload'
              : 'Done'}
          </button>
        </>
      )}
    </div>
  )
}

export default FileUpload
