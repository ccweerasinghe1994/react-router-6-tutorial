import {deleteContact} from "../contacts.ts";
import {redirect} from "react-router-dom";
import {LoaderFunctionArgs} from "react-router";
export async function action({ params }:LoaderFunctionArgs) {
    const response = await deleteContact(params?.contactId ?? undefined);
    if (response) return redirect(`/`);
}

