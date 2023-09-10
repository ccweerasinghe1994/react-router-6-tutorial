import {LoaderFunctionArgs} from "react-router";
import {getContact} from "../contacts.ts";
export async function contactLoader({ params }:LoaderFunctionArgs){
    const {contactId} = params;
    const contact = await getContact(contactId ?? undefined);
    if (!contact){
        throw new Response("",{
            status:404,
            statusText:"Not Found",
        });
    }
    return { contact };
}