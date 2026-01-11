import WindowControls from "#components/windowControls";
import { ChevronLeft, ChevronRight, Home, ShieldHalf, PanelLeft, Share, Plus, Copy, RefreshCcw, ShieldCheck } from "lucide-react";
import windowWrapper from "#hoc/windowWrapper";
import { socials, blogPosts } from "#constants";
import safariBg from "../assets/background.jpeg";

const Safari = () => {
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
                <div className="search-container flex-1 max-w-xl">
                    <input type="text" placeholder="Search or type a URL" className="search" />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Share className="icon"></Share>
                <RefreshCcw className="icon"></RefreshCcw>
                <Plus className="icon"></Plus>
                <Copy className="icon"></Copy>
            </div>
        </div>

        <div className="safari-content" style={{ backgroundImage: `url(${safariBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="safari-favorites-section">
                <h2 className="section-title">Favourites</h2>
                <div className="favorites-grid">
                    {socials.map((social) => (
                        <a 
                            key={social.id} 
                            href={social.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="favorite-item"
                        >
                            <div className="favorite-icon-wrapper">
                                <img src={social.icon} alt={social.text} className="favorite-icon" />
                            </div>
                            <span className="favorite-label">{social.text}</span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="safari-privacy-section">
                <h2 className="section-title mt-12!">Privacy Report</h2>
                <div className="privacy-card">
                    <div className="privacy-card-info">
                        <div className="privacy-shield-container">
                            <div className="shield-vignette"></div>
                            <ShieldCheck className="w-16 h-16 text-green-500 relative z-10" strokeWidth={1} />
                        </div>
                        <p className="privacy-desc">
                            Safari prevents trackers from profiling you.
                        </p>
                        <button className="privacy-show-more font-bold">Show More</button>
                    </div>
                    <div className="privacy-card-stats">
                        <div className="stat-box">
                            <span className="stat-label">Trackers prevented from profiling you</span>
                            <span className="stat-number">8</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Websites that contacted trackers</span>
                            <span className="stat-number">50%</span>
                        </div>
                        <div className="stat-box wide">
                            <span className="stat-label">Most contacted tracker</span>
                            <span className="stat-text">google-analytics.com was prevented from profiling you across 2 websites</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="safari-reading-list-section">
                <h2 className="section-title mt-12!">Reading List</h2>
                <div className="reading-list-grid">
                    {blogPosts.map((post) => (
                        <a 
                            key={post.id} 
                            href={post.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="reading-list-item"
                        >
                            <div className="post-image-wrapper">
                                <img src={post.image} alt={post.title} className="post-image" />
                            </div>
                            <div className="post-info">
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-excerpt">
                                    {post.title.includes("FastAPI") 
                                        ? "Exploring the speed and efficiency of FastAPI in modern web development." 
                                        : post.title.includes("Next.js")
                                        ? "Staying ahead of the curve with the latest features and architectural changes in Next.js 15."
                                        : "A comprehensive guide for beginners to dive into the world of Artificial Intelligence and Machine Learning."}
                                </p>
                                <span className="post-domain">medium.com</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </>
}

const SafariWindow = windowWrapper(Safari, "safari")
export default SafariWindow