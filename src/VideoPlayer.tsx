import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Tag, useThunkDispatch } from "./App";
import { change_video } from "./appSlice";
import { fetch_random_video } from "./SakugaAPI";
import VideoWrapper, { Video } from "./VideoWrapper";

type Props = {
    tag: Tag,
    video: Video | undefined,
    video_wrapper: VideoWrapper,
};

const VideoPlayer = ({ tag, video, video_wrapper }: Props) => {
    const dispatch = useThunkDispatch();
    const [loading, set_loading] = useState(true);

    useEffect(() => {
        let mounted = true;
        fetch_random_video(tag)
            .then(video_wrapper.wrap)
            .then(video => { if (mounted) dispatch(change_video(video)) })
        return () => { mounted = false };
    }, [tag, video_wrapper, dispatch]);

    const play_next_video = () => {
        fetch_random_video(tag)
            .then(video_wrapper.wrap)
            .then(set_video);
    }

    const set_video = (video: Video) => {
        dispatch(change_video(video));
    }

    return (
        <React.Fragment>
        {(!video || loading) && <CircularProgress className="video-loading" />}
        <video
            muted
            onWaiting={() => set_loading(true)}
            onCanPlay={() => set_loading(false)}
            preload="auto"
            autoPlay
            src={video?.url}
            onEnded={() => {set_loading(true); play_next_video()}}
        />
        </React.Fragment>
    );
}

export default VideoPlayer;