class BuilderUrl
{
    static buildUrlWithParam(
        url: string,
        params: Record<any, any>
    ) {
        const urlQuery = new URL(url);
        const urlParams = new URLSearchParams(params);

        // Add params
        urlQuery.search = urlParams.toString();
        return urlQuery.toString();
    }
}

export default BuilderUrl;
