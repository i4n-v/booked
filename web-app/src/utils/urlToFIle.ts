

export default async function urlToFile(url: string,  type: "image" | "application"): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileName = url.match(/(?<=(images|files)+\/.*-).*\..*$/);
    const fileExtension = fileName?.[0].match(/(?<=\.).*$/)
    return new File([blob], fileName?.[0] as string,{
        type: `${type}/${fileExtension?.[0]}`
    });
}