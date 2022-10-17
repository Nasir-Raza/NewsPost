import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

const NewsPost = ({ title, description, newsurl, imageurl }) => (
     <div className="post">

          <h1 className="post-head">Title:</h1>
          <h3>{title}</h3>
          <h1 className="post-head">Description:</h1>
          <p>{description}</p><hr />
          <img className="post-pic" src={imageurl} alt="news" />
          <a className="orig-link" href={newsurl} target="_blank" rel="noreferrer">View source for details...</a>

          <div><hr /></div>
          <div className="postFooter">
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

     useEffect(() => {

          axios.get("https://newsapi.org/v2/top-headlines?from=2022-10-18&country=us&apiKey=30cc024c717b4752bc57d50c4e0865b9")
               .then(response => {
                    console.log("response: ", response);
               }
               )
               .catch(err => {
                    console.log("error: ", err);
               }

               )

     }, []
     )

     return (

     
     < div className = "page" >
          <h1 className="pagehead">This is news page</h1>





          <div className="main">

          {
                posts.map((eachPost, i) => (
                    <>
                        <NewsPost
                            name={eachPost.name}
                            postText={eachPost.postText}
                            profilePhoto={eachPost.profilePhoto}
                            postImage="https://cdn.motor1.com/images/mgl/mrz1e/s3/coolest-cars-feature.jpg"
                            postDate={eachPost.postDate}
                        ></NewsPost>
                    </>
                ))
            }

               {/* <NewsPost
                    title="Holly Willoughby 'sneaks out of National Television Awards early' - Daily Mail"
                    description="The TV presenter, 41, was booed during the event when she and co-host Phillip Schofield's show This Morning was announced as one of the nominees for the Best Daytime award."
                    newsurl="https://www.dailymail.co.uk/tvshowbiz/article-11314105/Holly-Willoughby-sneaks-National-Television-Awards-early.html"
                    imageurl="https://i.dailymail.co.uk/1s/2022/10/14/02/63455473-0-image-a-36_1665710443955.jpg" />
               <NewsPost
                    title="Kwasi Kwarteng heads back to Westminster early as Tory discontent over mini-budget grows – UK politics live - The Guardian"
                    description="Chancellor makes early return from IMF meeting in Washington amid rumours around his job and that of prime minister Liz Truss"
                    newsurl="https://www.theguardian.com/politics/live/2022/oct/14/kwasi-kwarteng-chancellor-tory-discontent-mini-budget-liz-truss-corporation-tax-uk-politics-live"
                    imageurl="https://i.guim.co.uk/img/media/3aff458407c44468cc48614a4ddd5610a71220db/0_33_6000_3600/master/6000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctbGl2ZS5wbmc&enable=upscale&s=73f1c9b57a423964196cc1948808173f" />
               <NewsPost
                    title="U.S. Supreme Court rejects Trump request over seized documents - Reuters"
                    description="The U.S. Supreme Court on Thursday rejected former President Donald Trump's bid to have an independent arbiter vet classified documents that were seized by the FBI from his Florida home as part of his legal battle against investigators probing his handling of…"
                    newsurl="https://www.reuters.com/legal/us-supreme-court-rejects-trump-request-over-seized-documents-2022-10-13/"
                    imageurl="https://www.reuters.com/resizer/Y9JFiv5HNREmJ4dYImTw61rU6mE=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/SERA632KI5POHAAFVG7FOEI5V4.jpg" />

               <NewsPost
                    title="Russia's war in Ukraine: Live updates - CNN"
                    description="Moscow's deadly strikes on civilian targets have continued through the week, and the Ukrainian President has reiterated his plea to NATO for more air defense capacities. Follow live updates here."
                    newsurl="https://www.cnn.com/europe/live-news/russia-ukraine-war-news-10-14-22/index.html"
                    imageurl="https://media.cnn.com/api/v1/images/stellar/prod/221013162927-01-kherson-evacuation.jpg?c=16x9&q=w_800,c_fill" />

               <NewsPost
                    title="Saudis say US sought 1 month delay of OPEC+ production cuts - The Associated Press"
                    description="DUBAI, United Arab Emirates (AP) — Saudi Arabia said Thursday that the U.S. had urged it to postpone a decision by OPEC and its allies — including Russia — to cut oil production by a month. Such a delay could have helped reduce the risk of a spike in gas pric…"
                    newsurl="https://apnews.com/article/russia-ukraine-biden-inflation-business-elections-a359717a7edd2e609701d03328b55418"
                    imageurl="https://storage.googleapis.com/afs-prod/media/c3612113fb054603a0d20f1514a364be/2912.jpeg" />

               <NewsPost
                    title="Australia v England: third men’s T20 cricket international – live - The Guardian"
                    description="Over-by-over report: Will England complete a clean sweep in the final match of the series in Canberra? Join Tim de Lisle"
                    newsurl="https://www.theguardian.com/sport/live/2022/oct/14/australia-v-england-third-mens-t20-cricket-international-live"
                    imageurl="https://i.guim.co.uk/img/media/25efb53b17483205f7ba1086f6ae36228f7527f2/0_2_8192_4915/master/8192.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctbGl2ZS5wbmc&enable=upscale&s=53d0313ea81bfbb80e4565280e1c77c6" /> */}

          </div>
     </div >
     )
};

ReactDOM.render(<NewsPage />, document.querySelector("#root"));
