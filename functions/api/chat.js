export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const body = await request.json();
    
    const res = await fetch('https://api.coze.cn/v3/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pat_odqR9VH2FhDVAERwT6A5qlqsUiaVhjPPwbKQv4ZKS5kjaRCQfdQELrtXyPtxmKa3'
      },
      body: JSON.stringify({ ...body, stream: false })
    });
    
    const data = await res.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const chatId = url.searchParams.get('chat_id');
  const convId = url.searchParams.get('conversation_id');
  
  try {
    const res = await fetch(
      `https://api.coze.cn/v3/chat/message/list?chat_id=${chatId}&conversation_id=${convId}`,
      {
        headers: {
          'Authorization': 'Bearer pat_odqR9VH2FhDVAERwT6A5qlqsUiaVhjPPwbKQv4ZKS5kjaRCQfdQELrtXyPtxmKa3'
        }
      }
    );
    
    const data = await res.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
