import { random } from "lodash";
import React, { useEffect, useState } from "react";
import { Tag } from "./App";

const VideoPlayer = ({ random_tags }: { random_tags: Tag[] }) => {
    const [video, set_video] = useState<any>(undefined);
    useEffect(() => {
        if (random_tags.length > 0) {
            fetch_random_video({ tag: random_tags[0] }).then(set_video);
        }
    }, [random_tags]);
    return <video muted preload="auto" autoPlay loop src={video?.file_url} />
}

async function fetch_random_video({ tag, index = undefined }: { tag: Tag, index?: number }): Promise<any> {
    const random_number = random(tag.count);
    const url = '/api/post.json?limit=1&page=' + (index ?? random_number) + '&tags=' + tag.name;
    const response = await fetch(url);
    const videos = await response.json();
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