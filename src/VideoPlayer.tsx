import { random } from "lodash";
import React, { useEffect } from "react";
import { Tag, Video } from "./App";

type Props = {
    tags: Tag[],
    on_end: () => void,
    current_video: Video | undefined,
    set_current_video: (video: Video) => void,
    index: number,
    set_index: (index: number) => void,
    play_next: () => void,
};

const VideoPlayer = ({ tags, on_end, current_video, set_current_video, index, set_index, play_next }: Props) => {

    useEffect(() => {
        let mounted = true;
        if (tags.length > 0) {
            fetch_random_video({ tag: tags[index] }).then(video => {
                if (mounted) {
                    set_current_video(video)
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, [tags, index, set_current_video]);

    useEffect(() => {
        const on_keyup = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") {
                play_next();
            }
        };

        if (window){
            window.addEventListener("keyup", on_keyup);
        }
        return () => {
          window.removeEventListener("keyup", on_keyup);
        }
    }, [index, tags, on_end, set_index, play_next]);

    return (
        <React.Fragment>
            <h1 id="title">{index + 1}/{tags.length}</h1>
            <video muted preload="auto" autoPlay src={current_video?.url} onEnded={play_next} />
        </React.Fragment>
    )
}

async function fetch_random_video({ tag, index = undefined }: { tag: Tag, index?: number }): Promise<Video> {
    const random_number = random(tag.count);
    const url = '/api/post.json?limit=1&page=' + (index ?? random_number) + '&tags=' + tag.name;
    const response = await fetch(url);
    const videos: VideoResponse[] = await response.json();

    if (videoIsValid(videos[0])) {
        return {
            url: videos[0].file_url,
            id: videos[0].id,
            tag: tag,
        };
    } else {
        return fetch_random_video({
            tag,
            index: (random_number + 1) % tag.count
        });
    }
}

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