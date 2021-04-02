import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Tag, useThunkDispatch } from "./App";
import { mark_played, set_videos, skip_tag } from "./appSlice";
import { fetch_random_videos } from "./SakugaAPI";
import VideoWrapper, { Video } from "./VideoWrapper";

type Props = {
    tag: Tag,
    videos: Video[],
    video_wrapper: VideoWrapper,
};

const increment = (index: number, max: number) => (index + 1) % max;

const VideoPlayer = ({ tag, videos, video_wrapper }: Props) => {
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
    }, [tag, video_wrapper, dispatch]);

    const play_next_video = () => {
        if (videos.length > 1) {
            const new_index = increment(index, videos.length);
            set_index(new_index);
        }
    }

    return (
        <React.Fragment>
        {(videos.length === 0 || loading) && <CircularProgress className="video-loading" />}
        <video
            key={index}
            muted
            onWaiting={() => set_loading(true)}
            onPlay={() => {dispatch(mark_played(index)); set_loading(false);}}
            autoPlay
            loop={videos.length === 1}
            onError={play_next_video}
            src={videos[index]?.url}
            className="active"
            onEnded={() => {set_loading(true); play_next_video()}}
        />

        {
            videos.length > 1 &&
            <video
                key={increment(index, videos.length)}
                muted
                preload="auto"
                src={videos[increment(index, videos.length)]?.url}
            />
        }
        </React.Fragment>
    );

}

export default VideoPlayer;