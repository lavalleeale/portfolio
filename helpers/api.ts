import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import showdown from "showdown";

const postsDirectory = join(process.cwd(), "_posts");
const converter = new showdown.Converter();

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(slug: string, full: boolean = false) {
  const fileContents = fs.readFileSync(join(postsDirectory, slug), "utf8");
  const { data, content } = matter(fileContents);
  return {
    title: data.title,
    date: data.date,
    slug: slug.replace(/\.md$/, ""),
    content: converter.makeHtml(full ? content : content.slice(0, 100)),
  };
}
