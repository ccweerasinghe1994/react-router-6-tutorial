import {LoaderFunctionArgs} from "react-router";
import {getContacts} from "../contacts.ts";
export async function rootLoader({request}:LoaderFunctionArgs) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts,q };
}