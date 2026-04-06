import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, isAuthorized } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
  if (!isAuthorized(request.headers.get('Authorization')))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request.headers.get('Authorization')))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const body = await request.json();
  const { data, error } = await supabase.from('announcements').insert(body).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request.headers.get('Authorization')))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const { id, ...fields } = await request.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { data, error } = await supabase
    .from('announcements')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request.headers.get('Authorization')))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supabase.from('announcements').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
