import WindowControls from "#components/windowControls";
import { ChevronLeft, ChevronRight, Home, ShieldHalf, PanelLeft, Share, Plus, Copy, RefreshCcw, BookOpen } from "lucide-react";
import windowWrapper from "#hoc/windowWrapper";
import { blogPosts } from "#constants";

const Safari = () => {
    // Calculate reading time (rough estimate: 200 words per minute)
    const getReadingTime = (title) => {
        const wordCount = title.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200);
        return readingTime || 1;
    };

    return <>
        <div id="window-header">
            <WindowControls target="safari" />
            <PanelLeft className="w-10 h-8 icon"></PanelLeft>

            <div className="flex items-center gap-1 ml-5">
                <ChevronLeft className="icon"></ChevronLeft>
                <ChevronRight className="icon"></ChevronRight>
            </div>

            <div className="flex-1 flex-center gap-3">
                <ShieldHalf className="icon"></ShieldHalf>
                <Home className="icon"></Home>
                <input type="text" placeholder="Search or type a URL" className="search" />
            </div>

            <div className="flex items-center gap-2">
                <Share className="icon"></Share>
                <RefreshCcw className="icon"></RefreshCcw>
                <Plus className="icon"></Plus>
                <Copy className="icon"></Copy>
            </div>
        </div>

        <div className="blog-medium">
            <div className="blog-header">
                <h1>Developer Articles</h1>
                <p className="blog-subtitle">Stories and insights from the world of development</p>
            </div>

            <div className="blog-posts-container">
                {blogPosts.map((post) => (
                    <article key={post.id} className="blog-card">
                        <div className="blog-card-content">
                            <div className="blog-meta">
                                <span className="blog-author">Developer</span>
                                <span className="blog-separator">·</span>
                                <span className="blog-date">{post.date}</span>
                                <span className="blog-separator">·</span>
                                <span className="blog-reading-time">
                                    <BookOpen size={12} />
                                    {getReadingTime(post.title)} min read
                                </span>
                            </div>
                            <h2 className="blog-title">
                                <a href={post.link} target="_blank" rel="noopener noreferrer">
                                    {post.title}
                                </a>
                            </h2>
                        </div>
                        <div className="blog-image-wrapper">
                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                                <img src={post.image} alt={post.title} className="blog-image" />
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </>
}

const SafariWindow = windowWrapper(Safari, "safari")
export default SafariWindow