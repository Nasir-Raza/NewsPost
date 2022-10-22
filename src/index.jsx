import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

import moment from "moment/moment";

import axios from "axios";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// import { FaSpinner }  from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';
// import { CgSpinner } from 'react-icons/cg';

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
     const [isLoading, setIsLoading] = useState(false);
     const [queryString, setQueryString] = useState("");

     useEffect(() => {

          const getTrendingNews = () => {


               const options = {
                    method: 'GET',
                    url: 'https://bing-news-search1.p.rapidapi.com/news',
                    params: { textFormat: 'Raw', safeSearch: 'Off' },
                    headers: {
                         'X-BingApis-SDK': 'true',
                         'X-RapidAPI-Key': '90c71eaffdmsh27af00d66fd9c67p11e64fjsnd5ff70a5758d',
                         'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                    }
               };

               // const options = "https://newsapi.org/v2/top-headlines?from=2022-10-18&country=us&apiKey=30cc024c717b4752bc57d50c4e0865b9"

               setIsLoading(true);

               axios.request(options)
                    .then(
                         response => {
                              console.log("response: ", response);
                              setPosts(response.data.value);
                              // setPosts(response.data.articles);
                              setIsLoading(false);
                         }
                    )

                    .catch(
                         error => {
                              console.log("error: ", error);
                              setIsLoading(false);
                         }
                    )
          }

          getTrendingNews();



     }, []
     )

     const getSearchedNews = (e) => {
          e.preventDefault();
          const options = {
               method: 'GET',
               url: 'https://bing-news-search1.p.rapidapi.com/news/search',
               params: { q: queryString, safeSearch: 'Off', textFormat: 'Raw', freshness: 'Day' },
               headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': '90c71eaffdmsh27af00d66fd9c67p11e64fjsnd5ff70a5758d',
                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
               }
          };

          // const options = "https://newsapi.org/v2/top-headlines?from=2022-10-18&country="
          //      + queryString + "&apiKey=30cc024c717b4752bc57d50c4e0865b9"

          console.log("queryString: ", queryString);
          console.log("options: ", options);

          setIsLoading(true);

          axios.request(options)
               .then(
                    response => {
                         console.log("response: ", response);
                         setPosts(response.data.value);
                         // setPosts(response.data.articles);
                         setIsLoading(false);
                    }
               )

               .catch(
                    error => {
                         console.log("error: ", error);
                         setIsLoading(false);
                    }
               )
     }

     return (


          < div className="page dark" >

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

               <form className="search" onSubmit={getSearchedNews}>
                    <input type="text" name="search" id="search"
                         onChange={
                              (e) => {
                                   setQueryString(e.target.value)
                              }
                         }
                         placeholder="Enter search topic..." />

                    <button type="submit">Search</button>
               </form>

               <div className="main dark">

                    <div className="loading">
                         {
                              (isLoading)
                                   ? <div className="loader">
                                        <span>Loading news data...</span>
                                        <ImSpinner9 className="spinner" />
                                   </div> : " "
                         }

                    </div>

                    {
                         posts.map((eachPost, i) => (
                              <div key={i}>
                                   <NewsPost
                                        //    isLit = {isLit}
                                        title={eachPost?.name}
                                        description={eachPost?.description}
                                        newsurl={eachPost?.url}
                                        imageurl={
                                             eachPost?.image?.thumbnail?.contentUrl
                                                  .replace("&pid=News", "")
                                                  .replace("pid=News&", "")
                                                  .replace("pid=News", "")
                                        }
                                        date={eachPost?.datePublished}
                                   ></NewsPost>
                              </div>
                         ))
                    }

                    {/* {
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
                    } */}

               </div>
          </div >
     )
};

ReactDOM.render(<NewsPage />, document.querySelector("#root"));
