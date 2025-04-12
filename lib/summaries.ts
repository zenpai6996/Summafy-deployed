import {getDbConnection} from "../lib/db";

export async function getSummaries(userId:string){
    const sql = await  getDbConnection();
    const summaries = await sql`select * from pdf_summaries where user_id=${userId} order by created_at desc`;
    return summaries;
}
export async function getSummaryById(id:string){
    try{
        const sql = await getDbConnection();
        const [summary] = await sql`SELECT
                                        id,
                                        user_id,
                                        title,
                                        original_file_url,
                                        summary_text,
                                        created_at,
                                        updated_at,
                                        status,
                                        file_name,
                                        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
                                    from pdf_summaries where id=${id} ORDER BY created_at DESC `;
        if(summary.length === 0){
            return null;
        }
        return summary;
    }catch(error){
        console.error('Error fetching summary:', error);
        return null;
    }
}