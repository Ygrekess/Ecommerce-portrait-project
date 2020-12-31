import React, { Fragment, useState } from 'react'
import Axios from 'axios'


export default function PhotoImport_Page() {

    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('')
    const [uploadedFile, setUploadedFile] = useState({})

 const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await Axios.post('http://localhost:5000/api/orders/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

    } catch (err) {
        
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className='row custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input col-4 m-auto'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label col-4 m-auto' htmlFor='customFile'>
            {fileName}
          </label>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4 col-4 m-auto'
        />
      </form>
{/*       {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null} */}
    </Fragment>
  );
};

