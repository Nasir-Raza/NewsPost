import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import moment from "moment/moment";

import axios from "axios";

const NewsPost = ({ isLit, title, description, newsurl, imageurl, date }) => (
     <div className="post dark">
         
          <span className={(isLit) ? 'lit' : 'dark'}>{moment(`${date}`).format('Do MMMM, h:mm a')}</span>
          <a className={(isLit) ? 'orig-link lit' : 'orig-link dark'} href={`${newsurl}`} target="_blank" rel="noreferrer">{title}</a>
          <p className={(isLit) ? 'lit' : 'dark'}>{description}</p><hr />
          <img className="post-pic" src={imageurl} alt="news" />
          
          <div>
               <hr />
          </div>
          <div className={(isLit) ? 'postFooter lit' : 'postFooter dark'}>
               <div><FontAwesomeIcon icon={faThumbsUp} /> Like</div>
               <div><FontAwesomeIcon icon={faComment} /> Comment</div>
               <div><FontAwesomeIcon icon={faShare} /> Share</div>
          </div>

          <div>
               <hr />
          </div>
     </div>

);

const NewsPage = () => {

    const [posts, setPosts] = useState([]);
//     const [isLit, setIsLit] = useState(true);

     useEffect(() => {

          axios.get("https://newsapi.org/v2/top-headlines?from=2022-10-18&country=us&apiKey=30cc024c717b4752bc57d50c4e0865b9")
               .then(response => {
                    console.log("response: ", response.data.articles);

                    setPosts(response.data.articles)
               }
               )
               .catch(err => {
                    console.log("error: ", err);
               }

               )

     }, []
     )

     return (

     
     < div className = "page dark" >

{/* <div className='head dark'>

<button className={(isLit) ? 'button lit' : 'button dark'}
  onClick={() => { setIsLit(!isLit) }}>
  {
    (isLit) ? <FontAwesomeIcon icon={faSun} size='3x' title='Light mode' />
      : <FontAwesomeIcon icon={faMoon} size='3x' title='Dark mode' />
  }
</button>


</div> */}

          <h1 className="pagehead dark">World's news page</h1>






          <div className="main dark">

          {
                posts.map((eachPost, i) => (
                    <div key={i}>
                        <NewsPost
                         //    isLit = {isLit}
                            title={eachPost.title}
                            description={eachPost.description}
                            newsurl={eachPost.url}
                            imageurl={eachPost.urlToImage}
                            date={eachPost.publishedAt}
                        ></NewsPost>
                    </div>
                ))
            }
               
          </div>
     </div >
     )
};

ReactDOM.render(<NewsPage />, document.querySelector("#root"));
