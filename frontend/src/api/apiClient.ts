import axios from 'axios';
import { IPost } from '../Interfaces';


const url = 'http://localhost:8080';

axios.interceptors.request.use((req)=>{
  const token = localStorage.getItem('user')
  if (token) req.headers.Authorization = `Bearer ${JSON.parse(token).token}`
  return req;
}, (e)=>{return Promise.reject(e)});

export const fetchPosts = () => axios.get<IPost[]>(`${url}/posts`).then((response) => response);
export const fetchOnePost = (id: string)=> axios.get<IPost>(`${url}/posts/${id}`).then((response) => {
  return response;
});
export const createPost = (newPost: IPost)=> axios.post(`${url}/posts`, newPost);
export const updatePost = (id: string, newPost: IPost)=> axios.patch(`${url}/posts/${id}`, newPost);
export const deleteOnePost = (id: string)=> axios.delete(`${url}/posts/${id}`);
export const likePost = (id: string)=> axios.patch(`${url}/posts/${id}/likePost`);
export const createComment = (comment: string, postId: string)=> axios.patch(`${url}/posts/${postId}/comment`, {comment, postId});
//user
export const logInUser = (formData) => axios.post(`${url}/user/signin`, formData);
export const createUser = (formData) => axios.post(`${url}/user/signup`, formData);
