import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const parseSection = (section:string) => {
    const [title, content] = section.split('\n',2);
    return {
        title, content
    }
}

export async function SummaryViewer({summary}:{summary:string}){

    //parse the summary

    const sections = summary.split('\n# ').map((section) => section.trim()).filter(Boolean).map(parseSection);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
                {JSON.stringify(sections)}
            </CardContent>
        </Card>
    )
}