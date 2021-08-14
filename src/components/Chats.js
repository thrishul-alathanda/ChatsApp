import React , { useRef, useState, useEffect } from 'react';
//import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
  
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userphoto.jpg", { type: 'image/jpg'})
    }
    useEffect(() => {
        if(!user) {
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "98ab4357-7ae4-448d-b82e-dab28be3efc4",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new formdata();
            formdata.append('email',user.email);
            formdata.append('username',user.email);
            formdata.append('secret',user.uid);
            
            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)
                    axios.post('https://api.chatengine.io/users',
                        formdata,
                        { headers: { "private-key": "21c727e4-8132-4a5f-b45d-bf351297ccb0" }}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })


    },[user, history]);

    if(!user || loading) return 'Loading...';
    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ChatsApp
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh-66px)"
                projectID="98ab4357-7ae4-448d-b82e-dab28be3efc4"
                userName={user.email}
                userSecrect={user.uid}
            />    
        </div>
    )
}

export default Chats;