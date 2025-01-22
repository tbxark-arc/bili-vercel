export async function POST(request) {
    const { input } = await request.json();
    const url = input.match(/https:\/\/b23\.tv\/\w+/)[0];
    const resp = await fetch(url);
    const bvid = resp.url.match(/BV\w+/)[0];
    return new Response(JSON.stringify({bvid}), {
        headers: {
            'content-type': 'application/json',
        },
    });
}
