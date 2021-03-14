import { CircularProgress } from "@material-ui/core";
import { random } from "lodash";
import React, { useEffect, useState } from "react";
import { Tag, Video } from "./App";

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
        fetch_video({ tag }).then(video => {
            if (mounted) {
                set_current_video(video);
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
        fetch_video({ tag, page: next_page }).then(video => {
            set_current_video(video)
        });
    }

    const fetch_video = async ({ tag, page = undefined }: { tag: Tag, page?: number }): Promise<Video> => {
        page = page ?? random(tag.count);
        const url = '/api/post.json?limit=1&page=' + page + '&tags=' + tag.name.replaceAll(" ", "_");
        const response = await fetch(url);
        const videos: VideoResponse[] = await response.json();

        if (videoIsValid(videos[0])) {
            set_page(page);
            return {
                url: videos[0].file_url,
                id: videos[0].id,
                tag: tag,
            };
        } else {
            return fetch_video({
                tag,
                page: increment(page, tag)
            });
        }
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

const increment = (page: number, tag: Tag) => (page + 1) % tag.count;

function videoIsValid(video: any) {
    return video
        && video.file_url
        && (video.file_ext === "mp4" || video.file_ext === "webm")
        && video.id;
}

type VideoResponse = {
    file_url: string,
    id: number,
};

export default VideoPlayer;