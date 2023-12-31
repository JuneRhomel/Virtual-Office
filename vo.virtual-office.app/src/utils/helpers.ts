import { FormEvent } from "react";

export function Serializer(event: FormEvent<HTMLFormElement> ) {
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    interface formDataType { [key: string]: FormDataEntryValue }
    const responseBody: formDataType = {};

    formData.forEach((value, property: string) => responseBody[property] = value);
    return JSON.stringify(responseBody)
}