import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeConversations } from '../../actions';
import "font-awesome/css/font-awesome.min.css"


const User = (props) => {


    const {user, onClick} = props;
  
    return (
        <div className="d-flex align-items-start" onClick={() => onClick(user)}>
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
            <div class="flex-grow-1 ml-3">
            {user.firstName} {user.lastName}
                <div className="small">
                    <span className={user.isOnline ? `chat-online` : `chat-offline`}>
                        {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>
        </div>
    );
}

const ChatImageDisplay = () => {
    return (
        <div class="position-relative">
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
        </div>
    );
}


const HomePage = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    const [userUid, setUserUid] = useState(null);
    let unsubscribe;

    useEffect(() => {

        unsubscribe = dispatch(getRealtimeUsers(auth.uid))
        .then(unsubscribe => {
          return unsubscribe;
        })
        .catch(error => {
          console.log(error);
        })
    
        
    
    
      }, []);
    
      //console.log(user);
    
      //componentWillUnmount
      useEffect(() => {
        return () => {
          //cleanup
          unsubscribe.then(f => f()).catch(error => console.log(error));
    
        }
      }, []);
    
    
      const initChat = (user) => {
    
        setChatStarted(true)
        setChatUser(`${user.firstName} ${user.lastName}`)
        setUserUid(user.uid);
    
        console.log(user);
    
        dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
    
      }
    
      const submitMessage = (e) => {
    
        const msgObj = {
          user_uid_1: auth.uid,
          user_uid_2: userUid,
          message
        }
    
    
        if(message !== ""){
          dispatch(updateMessage(msgObj))
          .then(() => {
            setMessage('')
          });
        }
    
        //console.log(msgObj);
    
      }
    

    return (
    <Layout>
        <main class="content">
            <div class="container-fluid p-0">
            
                <div class="row g-0">

                    <div class="col-12 col-lg-5 col-xl-3 border-right h-100">

                        <div class="card bg-transparent border-0">
                            <div class="card-header">
                                <div class="px-4 d-none d-md-block">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1">
                                            <input type="text" class="form-control my-3" placeholder="Search..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                {
                                    user.users.length > 0 ?
                                    user.users.map(user => {
                                        if (user.uid != auth.uid) {
                                            return (
                                                <User 
                                                    onClick={initChat}
                                                    key={user.uid} 
                                                    user={user} 
                                                />
                                            );
                                        }
                                    }) : null
                                }

                                <hr class="d-block d-lg-none mt-1 mb-0" />
                            </div>
                        </div>

                    </div>



                    <div class="col-12 col-lg-7 col-xl-9 h-100">
                        <div class="card border-0 bg-tranparent h-100">
                            <div class="card-header border-0">
                                <div class="py-2 px-4 border-bottom d-none d-lg-block">
                                    <div class="d-flex align-items-center py-1">
                                        {
                                            chatStarted ? ChatImageDisplay() : null
                                        }
                                        <div class="flex-grow-1 pl-3">
                                        <strong>
                                            {
                                                chatStarted ? chatUser : ''
                                            }
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="row">
                                    <div class="chat-messages p-4">
                                        {
                                            chatStarted ? 
                                                user.conversations.map(con =>
                                                    <div className={` ${con.user_uid_1 == auth.uid ? 'chat-message-right pb-4' : 'chat-message-left pb-4'} `}>
                                                        <div>
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                                                        </div>
                                                        <div class={`flex-shrink-1 bg-light rounded py-2 px-3 ${con.user_uid_1 == auth.uid ? 'mr-3' : 'ml-3'}`}>
                                                            {con.message}
                                                        </div>
                                                    </div> 
                                                )
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer fixed-bottom">
                                {
                                    chatStarted ?
                                    <div class="flex-grow-0 py-3 px-4 border-top">
                                        <div class="input-group">
                                            <input type="text" value={message} class="form-control" onChange={(e) => setMessage(e.target.value)} placeholder="Type your message" />
                                            <button class="btn btn-primary" onClick={submitMessage}>Send</button>
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>
                        
                        

                    </div>
                </div>

            </div>
        </main>
    </Layout>
  );
}

export default HomePage;