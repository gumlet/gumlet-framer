// Gumlet Video Embed code for Framer
import { addPropertyControls, ControlType } from "framer"
import { useMemo, type CSSProperties } from "react"

interface GumletVideoEmbedProps {
    videoId: string
    title: string
    autoplay: boolean
    background: boolean
    loop: boolean
    controls: boolean
    aspectRatio: number
    showTitle: boolean
    style?: CSSProperties
}

/**
 * Gumlet Video Embed
 *
 * @framerIntrinsicWidth 600
 * @framerIntrinsicHeight 400
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function GumletVideoEmbed(props: GumletVideoEmbedProps) {
    const {
        videoId,
        title,
        autoplay,
        background,
        loop,
        controls,
        aspectRatio,
        showTitle,
        style,
    } = props

    const paddingBottom = useMemo(() => `${100 / aspectRatio}%`, [aspectRatio])

    const url = useMemo(() => {
        try {
            const u = new URL(`https://play.gumlet.io/embed/${videoId}`)
            const params = u.searchParams
            params.set("autoplay", autoplay ? "true" : "false")
            params.set("background", background ? "true" : "false")
            params.set("loop", loop ? "true" : "false")
            params.set("controls", controls ? "true" : "false")
            params.set("video_title", showTitle ? "true" : "false")
            u.search = params.toString()
            return u.toString()
        } catch {
            return "about:blank"
        }
    }, [videoId, autoplay, background, loop, controls, showTitle])

    return (
        <div
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: 0,
                paddingBottom,
            }}
        >
            <iframe
                src={url}
                title={title}
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                }}
            />
        </div>
    )
}

addPropertyControls(GumletVideoEmbed, {
    videoId: {
        type: ControlType.String,
        title: "Video ID",
        defaultValue: "648556aa1c2ca2ad5ba7a97b",
        placeholder: "Video ID",
    },
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: "Gumlet Video",
    },
    autoplay: {
        type: ControlType.Boolean,
        title: "Autoplay",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    loop: {
        type: ControlType.Boolean,
        title: "Loop",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    showTitle: {
        type: ControlType.Boolean,
        title: "Show Title on Embed",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    controls: {
        type: ControlType.Boolean,
        title: "Player Controls",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    aspectRatio: {
        type: ControlType.Number,
        title: "Aspect Ratio",
        defaultValue: 16 / 9,
    },
    background: {
        type: ControlType.Boolean,
        title: "Background Video",
        defaultValue: false,
    },
})