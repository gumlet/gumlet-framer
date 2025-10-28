import "framer-plugin/framer.css"
import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { framer } from "framer-plugin"

// Show the plugin UI
framer.showUI({
    position: "top right",
    width: 320,
    height: 280,
})

const project = await framer.getPublishInfo();

function App() {
    const [videoId, setVideoId] = useState("")

    const handleAddGumletVideo = async () => {
        if (!videoId.trim()) {
            alert("Please enter a video ID")
            return
        }

        const isAllowed = await framer.isAllowedTo("addComponentInstance")
        if (isAllowed) {
            await framer.addComponentInstance({
                url: "https://framer.com/m/GumletVideo-fQzP.js@C50u2EiqkmRlMWM8cA1V",
                attributes: {
                    controls: {
                        videoId: videoId,
                        title: "Gumlet Video",
                        autoplay: false,
                        loop: false,
                        showTitle: true,
                        disableControls: false,
                        aspectRatio: 16 / 9,
                        background: false,
                    }
                },
            })
            framer.closePlugin()
        } else {
            console.log("You are not allowed to add component instances");
            await framer.notify("You are not allowed to add component instances", {variant: "error"})
            return
        }
        
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>
                Gumlet Video Component
            </h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#666" }}>
                Enter your Gumlet video ID to add it to your canvas.
            </p>
            
            <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                    Video ID:
                </label>
                <input
                    type="text"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    placeholder="Enter your video ID"
                    style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                        marginBottom: "5px"
                    }}
                />
                <span style={{textDecoration: "underline"}}>
                    <a style={{color:"inherit"}}
                    target="_blank"
                    href={`https://docs.gumlet.com/docs/embed-videos-on-framer#/how-to-get-gumlet-video-id?utm_source=framer&utm_medium=plugin-block&utm_content=${encodeURIComponent(project.staging?.url)}`}>
                        Click here to get your video ID.
                    </a>
                </span>
            </div>

            <button 
                className="framer-button-primary" 
                onClick={handleAddGumletVideo}
                disabled={!videoId.trim()}
                style={{
                    width: "100%",
                    padding: "8px 16px",
                    fontSize: "14px",
                    opacity: !videoId.trim() ? 0.5 : 1,
                    cursor: !videoId.trim() ? "not-allowed" : "pointer"
                }}
            >
                Add Gumlet Video
            </button>
        </div>
    )
}

const root = document.getElementById("root")
if (!root) throw new Error("Root element not found")

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
