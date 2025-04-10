export const parseSection = (section:string):{title:string;points:String[]} => {
    const [title, ...contentLines] = section.split('\n');
    const cleanTitle = title.startsWith('#') ? title.substring(1).trim() : title.trim();
    const content = contentLines.join('\n');
    const lines = content.split('\n');
    const points : String[] =[];
    let currentPoint = '';
    lines.forEach((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*') || trimmedLine.startsWith('.')) {
            if (currentPoint) points.push(currentPoint);
            currentPoint = trimmedLine.substring(1).trim();
        } else if (!trimmedLine) {
            if (currentPoint) points.push(currentPoint);
            currentPoint = '';
        } else {
            currentPoint += (currentPoint ? ' ' : '') + trimmedLine;
        }
    });
    if(currentPoint) points.push(currentPoint.trim());
    return {
        title: cleanTitle,
        points:points.filter(
            (point) => point && !point.startsWith('#') && !point.startsWith('[Choose'),
        ) as String[],
    }
}
