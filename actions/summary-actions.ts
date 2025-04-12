'use server';

import { getDbConnection } from "@/lib/db";
import {currentUser} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

export async function deleteSummaryAction({summaryId}:{summaryId:string}){
    try{
        const user = await currentUser();
        const userId = user?.id;
        if(!userId){
            throw new Error('User not found');
        }
        const sql = await getDbConnection();
        //delete from database
        const result = await sql`delete from pdf_summaries where id=${summaryId} and user_id = ${userId}
                                                        returning id`;
        if(result.length > 0) {
            //revalidate path
            revalidatePath('/dashboard');
            return {success: true};
        }
        return {success: false};
    }catch(error){
        console.error('Error deleting summary:', error);
        return {success: false, error: (error as Error).message};
    }
}