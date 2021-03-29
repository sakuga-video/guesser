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

export async function fetch_random_videos(tag: Tag, limit = 8): Promise<VideoResponse[]> {
    const url = API_URL+'post.json?tags=rating:safe order:random ext:mp4,webm ' + tag.name.split(" ").join("_") + "&limit=" + limit;
    const response = await fetch(url);
    return await response.json();
}

const map_tag = (jsonTag: any): Tag => ({
    count: jsonTag.count,
    id: jsonTag.id,
    name: jsonTag.name.split("_").join(" "),
});