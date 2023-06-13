import ViewBlog from "@/app/components/blog/view";

const BASEURL = "https://cms.cloudmeshsolutions.com/api"
async function getBlog(pagePath: string) {
    const url = BASEURL + `/cms/access/6478e25e9ae41f93c3cfef8f?pagePath=/${pagePath}`;
    const response = await fetch(url, {
        method: "GET",
        headers: new Headers({}),
    });

    const data = await response.json();

    const page = { ...data?.data?.Blog, slug: "blog_detail" };
    return page
}

export default async function page({ params }: Params) {
    const blog = await getBlog(params.slug)
    return (
        <div>
            <ViewBlog title={blog?.title?.en} />
        </div>
    )
}

export async function generateStaticParams() {
    const blogUrl = BASEURL + `/blog?sdetail=true?filter={"websiteAdmin":"646ce566317ec72916785a0c"}`;
    const blogResponse = await fetch(blogUrl, {
        method: "GET",
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain",
            "X-My-Custom-Header": "value-v",
        }),
    });
    const blogs = await blogResponse.json()
    return blogs?.data?.Blog.map((blog: Blog) => ({
        slug: blog.pagePath
    }))
}

interface Blog {
    pagePath: string,
    id: string,
    name: string
}

interface Params {
    params: Slug
}
interface Slug {
    slug: string
}

