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
        stream: false,
        auto_save_history: true,
        additional_messages: body.additional_messages
      })
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: String(err)
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const chatId = url.searchParams.get('chat_id');
  const convId = url.searchParams.get('conversation_id');

  try {
    const retrieveRes = await fetch(
      `https://api.coze.cn/v3/chat/retrieve?chat_id=${chatId}&conversation_id=${convId}`,
      {
        headers: {
          'Authorization': `Bearer ${env.COZE_TOKEN}`
        }
      }
    );

    const retrieveData = await retrieveRes.json();

    if (retrieveData?.data?.status !== 'completed') {
      return new Response(JSON.stringify(retrieveData), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const listRes = await fetch(
      `https://api.coze.cn/v3/chat/message/list?chat_id=${chatId}&conversation_id=${convId}`,
      {
        headers: {
          'Authorization': `Bearer ${env.COZE_TOKEN}`
        }
      }
    );

    const listData = await listRes.json();

    return new Response(JSON.stringify(listData), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
