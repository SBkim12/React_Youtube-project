import React, { useCallback, useEffect, useState } from "react";
import styles from "./app.module.css";
import VideoList from "./components/video_list/video_list";
import SearchHeader from "./components/search_header/search_header";
import VideoDetail from "./components/video_detail/video_detail";

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  //useCallback은 한 번 만들면 메모리상에서 계속 보관하기 때문에 메모리에 영향이 감
  const search = useCallback((query) => {
    setSelectedVideo(null);
    if(query===""){
      youtube
    .mostPopular() //
    .then((videos) => setVideos(videos));
    }else{
      youtube
      .search(query) //
      .then((videos) => {
        setVideos(videos);
      });
    }
  }, [youtube] );

  useEffect(() => {
    youtube
    .mostPopular() //
    .then((videos) => setVideos(videos));
  }, [youtube]);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
