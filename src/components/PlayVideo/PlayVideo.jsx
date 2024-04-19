import React, { useEffect, useState } from 'react'
import './PlayVideo.css'


import video1 from "../../assets/youtube_clone_assets/assets/video.mp4"
import like from "../../assets/youtube_clone_assets/assets/like.png"
import dislike from "../../assets/youtube_clone_assets/assets/dislike.png"
import save from "../../assets/youtube_clone_assets/assets/save.png"
import share from "../../assets/youtube_clone_assets/assets/share.png"
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import {useParams} from 'react-router-dom'
const PlayVideo = () => {

    const {videoId}=useParams();

    const [apiData,setApiData]=useState();
    const [chanelData,setChannelData]=useState()
    const [commentData,setCommentData]=useState([])

    const fetchVideoData=async()=>{
        //fetching video data
        const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>{
            setApiData(data.items[0])
        })
    }
    
    const fetchOtherData=async()=>{
        //fetching channel data
        if(apiData.snippet.channelId){
            const channelId=apiData.snippet.channelId
            const chanelData_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
           await fetch(chanelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))
            
           //fetching comment data
           const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
           await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
        }
    }
    
    useEffect(()=>{
        fetchVideoData();
    },[videoId])
    useEffect(()=>{
        fetchOtherData();
    },[apiData])
    if (!apiData || !chanelData) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apiData.snippet.title}</h3>
            <div className="play-video-info">
                <p>{value_converter(apiData.statistics.viewCount)} Views &bull; {moment(apiData.snippet.publishedAt).fromNow()}</p>
                <div>
                    <span><img src={like} alt="" />{value_converter(apiData.statistics.likeCount)}</span>
                    <span><img src={dislike} alt="" />{}</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={chanelData.snippet.thumbnails.default.url} alt="" />
                <div>
                    <p> {apiData.snippet.channelTitle}</p>
                    <span>{value_converter(chanelData.statistics.subscriberCount)} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className=' vid-description'>
                <p>{apiData.snippet.description.slice(0,250)}</p>

                <hr />
                <h4>{value_converter(apiData.statistics.commentCount)} Comments</h4>
                {commentData.map((item,index)=>{
                    return(

                <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                            <img src={dislike} alt="" />
                            <span></span>
                        </div>
                    </div>
                </div>
                    )
                })}
                
            </div>

        </div>
    )
}

export default PlayVideo