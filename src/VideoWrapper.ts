import { Tag } from "./App";
import { VideoResponse } from "./SakugaAPI";
import { Map } from "immutable";

class VideoWrapper {
    readonly tags_by_name: Map<string, Tag>;

    constructor(all_tags: Tag[]) {
        this.tags_by_name = Map(all_tags.map(tag => [tag.name, tag]));
    }

    wrap(video_response: VideoResponse): Video {
        const tags = video_response.tags
            .split(" ")
            .map(tag_string => tag_string.replaceAll("_", " "))
            .map(tag_string => this.tags_by_name.get(tag_string))
            .filter(tag => tag !== undefined) as Tag[];

        return {
            tags,
            url: video_response.file_url,
            id: video_response.id,
        }
    }
}

export type Video = {
    readonly url: string,
    readonly id: number,
    readonly tags: Tag[],
};

export default VideoWrapper;