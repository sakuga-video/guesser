import { random } from "lodash";
import React, { useEffect, useState } from "react";
import { Tag, Video } from "./App";

type Props = {
    tags: Tag[],
    clear_tags: () => void,
    current_video: Video | undefined,
    set_current_video: (video: Video) => void,
};

const VideoPlayer = ({ tags, clear_tags, current_video, set_current_video }: Props) => {
    const [index, set_index] = useState<number>(0);

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
        const play_next = () => {
            if ((index + 1) < tags.length) {
                set_index(index + 1);
            } else {
                clear_tags();
            }
        }

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
    }, [index, tags, clear_tags]);

    const play_next = () => {
        if ((index + 1) < tags.length) {
            set_index(index + 1);
        } else {
            clear_tags();
        }
    }

    return (
        <React.Fragment>
            <h1>{index + 1}/{tags.length}</h1>
            <video muted preload="auto" autoPlay src={current_video?.file_url} onEnded={play_next} />
            <p>{tags[index].name.replaceAll("_", " ")}</p>
            <p>{tags[index].count}</p>
        </React.Fragment>
    )
}

async function fetch_random_video({ tag, index = undefined }: { tag: Tag, index?: number }): Promise<any> {
    const random_number = random(tag.count);
    const url = '/api/post.json?limit=1&page=' + (index ?? random_number) + '&tags=' + tag.name;
    const response = await fetch(url);
    const videos: Video[] = await response.json();
    const video = videos[0];

    if (videoIsValid(video)) {
        return video;
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

export default VideoPlayer;