import { useEffect, useState } from "react";
import { Tag } from "./App";
import { fetch_video, increment, Page, VideoResponse } from "./SakugaAPI";
import VideoWrapper, { Video } from "./VideoWrapper";

type Props = {
    tag: Tag,
    video: Video | undefined,
    on_video_changed: (video: Video) => void,
    video_wrapper: VideoWrapper,
};

const VideoPlayer = ({ tag, video, on_video_changed, video_wrapper }: Props) => {
    const [page, set_page] = useState<number | undefined>(undefined);

    useEffect(() => {
        let mounted = true;
        fetch_video({ tag }).then(video_page => {
            if (mounted) {
                const video = video_wrapper.wrap(video_page.data);
                on_video_changed(video);
                set_page(video_page.page);
            }
        });
        return () => { mounted = false };
    }, [tag, video_wrapper, on_video_changed]);

    const play_next_video = () => {
        const next_page = increment(page!, tag);
        fetch_video({ tag, page: next_page }).then(set_video);
    }

    const set_video = (video_page: Page<VideoResponse>) => {
        const video = video_wrapper.wrap(video_page.data);
        on_video_changed(video);
        set_page(video_page.page);
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