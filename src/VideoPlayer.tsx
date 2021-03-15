import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Tag, Video } from "./App";
import { fetch_video, increment } from "./SakugaAPI";

type Props = {
    tag: Tag,
    current_video: Video | undefined,
    set_current_video: (video: Video) => void,
    play_next_tag: () => void,
};

const VideoPlayer = ({ tag, current_video, set_current_video, play_next_tag }: Props) => {
    const [page, set_page] = useState<number | undefined>(undefined);
    const [timer, set_timer] = useState<number>(0);
    
    useEffect(() => {
        let mounted = true;
        fetch_video({ tag }).then(video_page => {
            if (mounted) {
                set_current_video(video_page.data);
                set_page(video_page.page);
            }
        });
        return () => { mounted = false };
    }, [tag, set_current_video]);

    useEffect(() => {
        let timer = 0;
        const timer_step_size = 50;
        console.log("starting interval");
        const interval = setInterval(() => {
            if (timer >= TIMER_LENGTH) {
                timer = 0;
                set_timer(timer);
                play_next_tag();
            } else {
                timer += timer_step_size;
                set_timer(timer);
            }
        }, timer_step_size);
        return () => {clearInterval(interval);console.log("clearing interval");};
    }, [tag]);

    const play_next_video = () => {
        const next_page = increment(page!, tag);
        fetch_video({ tag, page: next_page }).then(video_page => {
            set_current_video(video_page.data);
            set_page(video_page.page);
        });
    }

    return (
        <React.Fragment>
            <CircularProgress color={normalize(timer) < 25 ? "secondary" : "primary"} key={tag.id} variant="determinate" value={normalize(timer)} className="controls timer" />
            <video muted preload="auto" autoPlay src={current_video?.url} onEnded={play_next_video} />
        </React.Fragment>
    )
}

const TIMER_LENGTH = 30_000;

const normalize = (value: number) => (TIMER_LENGTH - value) * 100 / TIMER_LENGTH;

export default VideoPlayer;