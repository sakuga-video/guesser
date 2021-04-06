import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Tag, useThunkDispatch } from "./App";
import { mark_played, set_videos, skip_tag } from "./appSlice";
import { fetch_random_videos } from "./SakugaAPI";
import VideoWrapper, { Video } from "./VideoWrapper";

type Props = {
    tag: Tag,
    round: number,
    videos: Video[],
    video_wrapper: VideoWrapper,
    should_play: boolean,
};

const increment = (index: number, max: number) => (index + 1) % max;

const VideoPlayer = ({ tag, round, videos, video_wrapper, should_play }: Props) => {
    const dispatch = useThunkDispatch();
    const [loading, set_loading] = useState(true);
    const [index, set_index] = useState(0);

    useEffect(() => {
        let mounted = true;
        set_index(0);
        fetch_random_videos(tag)
            .then(video_responses => video_responses.map(video_wrapper.wrap))
            .then(videos => {
                if (mounted) {
                    if (videos.length > 0) {
                        set_index(0);
                        dispatch(set_videos(videos));
                    } else {
                        dispatch(skip_tag());
                    }
                }
            })
        return () => { mounted = false }; 
    }, [tag, round, video_wrapper, dispatch]);

    const play_next_video = () => {
        if (videos.length > 1) {
            const new_index = increment(index, videos.length);
            set_index(new_index);
        }
    }

    return (
        <React.Fragment>
        {(videos.length === 0 || loading) && should_play && <CircularProgress className="video-loading" />}
        <ReactPlayer
            key={index}
            muted
            onBuffer={() => set_loading(true)}
            onStart={() => {dispatch(mark_played(index)); set_loading(false);}}
            onPlay={() => set_loading(false)}
            playing={should_play}
            loop={videos.length === 1}
            onError={play_next_video}
            url={videos[index]?.url}
            style={should_play ? {visibility: "visible"} : {}}
            className={should_play ? "active": ""}
            id="main-video"
            controls={false}
            width="100%"
            height="auto"
            onEnded={() => {play_next_video()}}
        />

        {
            videos.length > 1 &&
            <ReactPlayer
                key={increment(index, videos.length)}
                muted
                id="preloading-video"
                url={videos[increment(index, videos.length)]?.url}
            />
        }
        </React.Fragment>
    );

}

export default VideoPlayer;