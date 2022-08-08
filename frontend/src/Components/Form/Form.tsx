import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import * as api from '../../api/apiClient'

interface IForm {
  createPost: (formData: any) => any,
};

const initialState = {creator: '', title: '', message: '', tag: [], selectedFile: ''};

const Form = ({createPost}: IForm) => {
  const [postData, setPostData] = useState(initialState);
  // const editId = useSelector(state=>state.edit);
  // let onePost = useSelector(state=> editId ? state.posts.find((post)=> post._id === editId) : null);
  const storage: any = localStorage.getItem('user');
  const user = useState(JSON.parse(storage));
  const editId = false;
  const onePost = false;

  // useEffect(()=>{
  //   if(onePost) setPostData(onePost)
  // },[onePost]);

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    if(!editId){
      createPost(postData);

    } else {  

      try {
        const {data} = await api.updatePost(editId, postData);
      } catch(e) {
        console.log(e)
      }
      // onePost = null;
    }
    e.target.reset();
    setPostData({creator: '', title: '', message: '', tag: [], selectedFile: ''});
    console.log('Submit clicked');
    }

  const handleClear = () => {
    setPostData({creator: '', title: '', message: '', tag: [], selectedFile: ''});
    // onePost = null;
    console.log('clear clicked');
  }

  return (
    <Paper sx={{padding: '10px', backgroundColor: '#f7f7f8'}}>
      <form onSubmit={handleSubmit}>
          { onePost ? (<Typography variant='h6' sx={{textAlign: 'center', borderBottom: 'thin solid lightgray'}} >  Edit a post </Typography>) : (<Typography sx={{textAlign: 'center', borderBottom: 'thin solid lightgray'}} variant='h6' >  Create a post </Typography>) }
       { !user ? 
        (<TextField sx={{marginTop: '10px', marginBottom: '10px'}} name="creator" value={postData.creator } variant = "outlined" label="creator" fullWidth onInput={(e)=> setPostData({...postData, creator: e.target.value})} />) 
        : null}
        <TextField sx={{marginTop: '10px', marginBottom: '10px'}} name="title" variant = "outlined" label="Title" fullWidth value={  postData.title } onInput={(e)=> setPostData({...postData, title: e.target.value})} required/>
        <TextField sx={{marginTop: '10px', marginBottom: '10px'}} multiline maxRows={8} name="message" variant = "outlined" label="Message" fullWidth value={  postData.message } onChange={(e)=> setPostData({...postData, message: e.target.value})} required />
        <TextField sx={{marginTop: '10px', marginBottom: '20px'}} name="tag" variant = "outlined"  label="Tags" fullWidth value={ postData.tag } onChange={(e)=> setPostData({...postData, tag: e.target.value.split(',')})} required />
        <Grid item >
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
        </Grid>
       <Button sx={{marginTop: '20px', marginBottom: '10px'}} variant="contained" type="submit" size="large" fullWidth > {onePost ? "Edit" : "Submit"}</Button>
       <Button sx={{display: 'none'}} onClick={handleClear} variant='outlined' size="small">Clear</Button> 
      </form>
    </Paper>
  )
}

export default Form