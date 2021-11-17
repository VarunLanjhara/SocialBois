import React, { useState } from 'react'
import FileBase64 from "react-file-base64"
import { useDispatch } from 'react-redux'
import { createPosts } from '../../actions/posts'

const CreatePost = () => {

    const [postData,setpostData] = useState({author:"",title:"",body:"",tags:"",file:""})
    const dispatch = useDispatch()

    const createpost = (event) => {
        event.preventDefault()
        dispatch(createPosts(postData))
    }

    return (
        <div>
            <input type = "text" onChange={(e) => setpostData({...postData,author:e.target.value})}/>
            <input type = "text" onChange={(e) => setpostData({...postData,title:e.target.value})}/>
            <input type = "text" onChange={(e) => setpostData({...postData,body:e.target.value})}/>
            <input type = "text" onChange={(e) => setpostData({...postData,tags:e.target.value})}/>
            <FileBase64  type = "file"  multiple = {false} accept = "image/*" onDone = {({base64}) => setpostData({...postData,file:base64})}/>
            <button onClick={createpost}>Post Bruh</button>
        </div>
    )
}

export default CreatePost
