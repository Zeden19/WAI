import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getNameFromLink(link: String) {
    const secondLastSlash = link.slice(0, link.length - 1).lastIndexOf("/");
    const name = link.slice(secondLastSlash + 1, link.length - 1).replace("-", " ");
    return name.charAt(0).toUpperCase() + name.slice(1);
}