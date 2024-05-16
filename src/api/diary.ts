import { API_URL } from "@/constants";

export async function getDiaries() {
    const res = await fetch(API_URL + '/diary');
    const data = await res.json();
    return data;
}

