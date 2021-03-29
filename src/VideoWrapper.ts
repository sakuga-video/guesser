import { Tag } from "./App";
import { VideoResponse } from "./SakugaAPI";
import { Map } from "immutable";

class VideoWrapper {
    readonly tags_by_name: Map<string, Tag>;

    constructor(all_tags: Tag[]) {
        this.tags_by_name = Map(all_tags.map(tag => [tag.name, tag]));
    }

    readonly wrap = (video_response: VideoResponse): Video => {
        const tags = video_response.tags
            .split(" ")
            .map(tag_string => tag_string.split("_").join(" "))
            .map(tag_string => this.tags_by_name.get(tag_string))
            .filter(tag => tag !== undefined) as Tag[];

        return {
            tags,
            url: video_response.file_url,
            id: video_response.id,
            preview_url: video_response.preview_url,
        }
    }
}

export type Video = {
    readonly url: string,
    readonly id: number,
    readonly tags: Tag[],
    readonly preview_url: string,
    readonly played?: boolean,
};

export default VideoWrapper;