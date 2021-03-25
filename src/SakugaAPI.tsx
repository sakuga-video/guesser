import { Tag, TagType } from "./App";

const API_URL = "/api/";

export type VideoResponse = {
    file_url: string,
    id: number,
    tags: string,
    preview_url: string,
};

export async function fetch_all_tags() {
    const response = await fetch(API_URL+'tag.json?limit=0&order=count&type='+TagType.COPYRIGHT);
    const tags: Tag[] = (await response.json()).map(map_tag);
    return tags.filter(({ count }) => count > 0);
}

export async function fetch_random_video(tag: Tag): Promise<VideoResponse> {
    const url = API_URL+'post.json?limit=1&tags=rating:safe order:random ext:mp4,webm ' + tag.name.replaceAll(" ", "_");
    const response = await fetch(url);
    const video: VideoResponse = (await response.json())[0];
    return video;
}

const map_tag = (jsonTag: any): Tag => ({
    count: jsonTag.count,
    id: jsonTag.id,
    name: jsonTag.name.replaceAll("_", " "),
});