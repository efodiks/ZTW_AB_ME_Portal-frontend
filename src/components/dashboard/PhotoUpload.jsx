import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#bdbdbd',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
};
  
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    width: "10em",
    height: "10em",
    padding: 4,
    boxSizing: 'border-box',
    marginLeft: "1em"
};
  
const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    justifyContent: "center"
};
  
const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function PhotoUpload({files, onDrop}) {

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({
        accept: 'image/*',
        onDrop: onDrop
    });
    
    const style = useMemo(() => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} />
            </div>
        </div>
    ));

    return (
        <div style={{display: "flex", height: "10em", marginTop: "2em", marginBottom: "2em"}}>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop photo here, or click to select file</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </div>
    );
}

export default PhotoUpload;