export async function GET(request) {
    const url = new URL(request.url);
    const bvid = url.searchParams.get('bvid');
    const cid = await fetch(`https://api.bilibili.com/x/player/pagelist?bvid=${bvid}&jsonp=jsonp`).then(r => r.json()).then(j => j.data[0].cid)
    const online = await fetch(`https:api.bilibili.com/x/player/online/total?cid=${cid}&bvid=${bvid}`).then(r => r.json()).then(j => parseInt(j.data.total))
    const status = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`).then(r => r.json())
    const num2str = (num) => {
        if (num >= 10000) {
            return `${(num / 10000).toFixed(1)}万`
        } else {
            return `${num}`
        }
    }
    const res = {
		title: status.data.title,
		cover: status.data.pic,
		play: num2str(status.data.stat.view),
		online: num2str(online),
	}
    return new Response(JSON.stringify(res), {
        headers: {
            'content-type': 'application/json',
        },
    });
}