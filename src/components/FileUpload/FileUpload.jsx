'use client'
import React, { useRef, useState } from 'react'
import './FileUpload.css'
import axios from 'axios'
import { Button } from '@/ui/button'
import { useSession } from 'next-auth/react'

const FileUpload = () => {
  const inputRef = useRef()

  const [selectedFile, setSelectedFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('select')
  const { data: session } = useSession()

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  const clearFileInput = () => {
    inputRef.current.value = ''
    setSelectedFile(null)
    setProgress(0)
    setUploadStatus('select')
  }

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

      {/* Button to trigger the file input dialog */}
      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          <span className="material-symbols-outlined">upload</span> Upload File
        </button>
      )}

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
