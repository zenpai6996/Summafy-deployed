"use server"
import {neon} from '@neondatabase/serverless';


export async function getDbConnection(){
    if(!process.env.DATABASE_KEY){
        throw new Error('DATABASE_KEY is not defined');
    }
    const sql = neon(process.env.DATABASE_KEY);
    return sql;

}