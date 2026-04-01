export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const res = await fetch('https://api.coze.cn/v3/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.COZE_TOKEN}`
      },
      body: JSON.stringify({
        bot_id: env.COZE_BOT_ID,
        user_id: body.user_id,
        stream: true,
        auto_save_history: true,
        additional_messages: body.additional_messages
      })
    });
    return new Response(res.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
