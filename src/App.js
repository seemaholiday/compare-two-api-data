import React, {useEffect, useState} from "react";
import './App.css';

function App() {
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [showScreen1, setShowScreen1] = useState(true)
  const [userTitleData, setUserTitleData] = useState([]);
  useEffect(()=>{
    const fetchData=()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setUser(json))
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPost(json))
    }
    fetchData()
  },[])
  useEffect(()=>{
    const arr = []
    if(user.length > 0 && post.length > 0)
    {
      post.map((item, index)=>{
        let obj = {}
          user.filter((s, i)=>{
            if(s.id == item.userId){
              obj["username"] = s.username
              obj["title"] = item.title
              obj["postId"] = item.id
            }

          })
          arr.push(obj)

      })
      setUserTitleData(arr)
    }

  },[user, post])
  const callCommentEvent = (e, item) =>{
    setComment([])
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${item.postId}`)
      .then(response => response.json())
      .then(json => setComment(json))
      setShowScreen1(false)
  }

  return (
    <div style={{margin:'20px'}}>
      {
        showScreen1 ? 
        <div className="flex">
          {
            userTitleData ? userTitleData.map((item, index)=>{
              return(
                <div className="UI-cards" style={{width:'150px'}} onClick={(e)=>callCommentEvent(e, item)}>
                  <div style={{fontWeight:'bolder', paddingBottom:"20px"}}>{item.username}</div>
                  <div>{item.title}</div>
                </div>
              )
            }) : "No data"
          }
        </div>
        : 
        <div>
          <button onClick={()=>setShowScreen1(true)}>Back</button>
          <div className="flex">
              {
                comment ? comment.map((data, i)=>{
                  return(
                    <div className="UI-cards" style={{width:'200px'}}>
                        <div style={{fontWeight:'bolder', paddingBottom:"20px"}}>{data.name}</div>
                        <div>{data.body}</div>
                    </div>
                  )
                }) : "Loading......."
              }
            </div>
        </div>
      }
    </div>
  );
}

export default App;
