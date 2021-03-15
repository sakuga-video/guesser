import { Tag, TagType, Video } from "./App";
import { random } from "lodash";

const API_URL = "/api/";

type VideoResponse = {
    file_url: string,
    id: number,
};

type Page<Data> = {
    data: Data,
    page: number,
}

export async function fetch_tags() {
    const response = await fetch(API_URL+'tag.json?limit=0&order=count&type='+TagType.COPYRIGHT);
    const tags: Tag[] = (await response.json()).map((jsonTag: any) => ({
      ambiguous: jsonTag.ambiguous,
      count: jsonTag.count,
      id: jsonTag.id,
      name: jsonTag.name.replaceAll("_", " "),
      type: jsonTag.type,
    }));
    return tags.filter(({ count }) => count > 0);
}

export async function fetch_video({ tag, page = undefined }: { tag: Tag, page?: number }): Promise<Page<Video>> {
    page = page ?? random(tag.count);
    const url = API_URL+'post.json?limit=1&page=' + page + '&tags=' + tag.name.replaceAll(" ", "_");
    const response = await fetch(url);
    const videos: VideoResponse[] = await response.json();

    if (videoIsValid(videos[0])) {
        return {
            data: {
                url: videos[0].file_url,
                id: videos[0].id,
                tag: tag,
            },
            page
        };
    } else {
        return fetch_video({
            tag,
            page: increment(page, tag)
        });
    }
}

export const increment = (page: number, tag: Tag) => (page + 1) % tag.count;

function videoIsValid(video: any) {
    return video
        && video.file_url
        && (video.file_ext === "mp4" || video.file_ext === "webm")
        && video.id;
}