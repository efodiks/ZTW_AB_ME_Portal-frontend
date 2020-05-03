import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import PhotoUpload from './PhotoUpload';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'

const AddPost = ({handleAddPost}) => {

    const [postDto, setPostDto] = useState({
        url: "",
        description: ""
    });

    const [files, setFiles] = useState([]);

    const onDrop = acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    };

    const onChange = (e) => {
        e.persist();
        const {name, value} = e.target;

        setPostDto((prevState => {
            return {
                ...prevState,
                [name]: value
            }
        }))
    };

    const onFormSubmit = () => {
        const cloudName = process.env.REACT_APP_CLOUD_NAME;
        const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET);
            formData.append("folder", process.env.REACT_APP_CLOUD_FOLDER);
            formData.append("timestamp", (Date.now() / 1000) | 0);
            axios.post(uploadURL, formData)
                .then(response => {
                    setPostDto({...postDto, url: response.data.secure_url});
                    handleAddPost({url: response.data.secure_url, description: postDto.description, uuid: uuidv4()});
                },
                    error => console.log(error))
        })
    };

    return (
        <Container>
            <Row className="justify-content-center" style={{margin: "1.5em 0em 1.5em 0em"}}>
                <Card body className="w-100">
                    <h1>Add post</h1>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        onFormSubmit();
                    }}>
                        <PhotoUpload files={files} onDrop={onDrop}/>
                        <Form.Row style={{marginTop: "1em", marginBottom: "1em"}}>
                            <Col>
                                <Form.Control as="textarea" placeholder="Description..."
                                              name="description"
                                              onChange={onChange}/>
                            </Col>
                        </Form.Row>
                        <div align="right">
                            <Button id="addPost" variant="info" type="submit" style={{width: "30%"}}>
                                Add post
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Row>
        </Container>
    );
}
export default AddPost;