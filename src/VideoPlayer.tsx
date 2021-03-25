import { useEffect } from "react";
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
        <video
            muted
            preload="auto"
            autoPlay
            src={video?.url}
            onEnded={play_next_video}
        />
    )
}

export default VideoPlayer;