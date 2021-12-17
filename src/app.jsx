import React, { useEffect, useState } from 'react';
import './app.css';
import VideoList from './component/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    const requestOptions = {
      method: "GET",
      redirect: 'follow',
    }
    
    fetch(
      'https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=25&chart=mostPopular&key=AIzaSyC7gRhabP4CA8-6S069E-MwcpPKb9TkeIA', requestOptions
    )
    .then(Response => Response.json())
    .then(result => setVideos(result.items))
    .catch(error => console.log('error', error));
  }, []);
  // 두번째 인자가 빈 인자가 들어가면 처음에 마운트 될때만 함수가 실행됨
  // 두번째 인자에 변수를 넣으면 그변수가 변할때마다 함수가 호출 됨
  return <VideoList videos={videos} />;
}

export default App;
