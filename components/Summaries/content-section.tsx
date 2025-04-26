
function parsePoint(point: string) {
    const isNumbered =/^\d+\./.test(point);
    const isMainPoint = /^/.test(point);
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;

    const hasEmoji = emojiRegex.test(point);
    const isEmpty = !point.trim();

    return { isMainPoint,isNumbered, hasEmoji, isEmpty };

}

function parseEmojiPoint(content:string){
    const cleanContent = content.replace(/^[•]\s*/, '').trim();
    const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
    if (!matches) return null;
    const [_, emoji, text] = matches;
    return {
        emoji: emoji.trim(),
        text: text.trim(),
    };
}

const EmojiPoint = ({ point, onClick }: { point: string; onClick: (point: string) => void }) => {
    const { emoji, text } = parseEmojiPoint(point) ?? {};
    return (
        <div
            onClick={() => onClick(point)}
            className={"group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all cursor-pointer"}
        >
            <div className={"absolute inset-0 bg-linear-to-r from-gray-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl "}/>
            <div className="flex items-start gap-3">
                {emoji && (
                    <span className="text-xs lg:text-xl shrink-0">
                        {emoji}
                    </span>
                )}
                <p className="text-xs lg:text-xl text-muted-foreground/90 leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    )
}
const RegularPoint = ({ point, onClick }: { point: string; onClick: (point: string) => void }) => {
    return (
        <div
            onClick={() => onClick(point)}
            className={"group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all cursor-pointer"}
        >
            <div className={"absolute inset-0 bg-linear-to-r from-gray-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl "}/>
            <p className={"relative text-sm lg:text-xl text-muted-foreground/90 leading-relaxed text-left"}>{point}</p>
        </div>
    )
}
export default function ContentSection({ title, points, onPointClick }: {
    title: string;
    points: string[];
    onPointClick: (point: string) => void
}) {
    return (
        <div className={"space-y-4"}>
            {points.map((point, index) => {
                const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point) ?? {};
                if (isEmpty) {
                    return null;
                }

                if (hasEmoji || isMainPoint) {
                    return (
                        <EmojiPoint
                            key={`point-${index}`}
                            point={point}
                            onClick={onPointClick}
                        />
                    )
                }
                return (
                    <RegularPoint
                        key={`point-${index}`}
                        point={point}
                        onClick={onPointClick}
                    />
                );
            })}
        </div>
    );
}