import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, isAuthorized } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
  if (!isAuthorized(request.headers.get('Authorization')))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('restaurant_info')
    .select('*')
    .eq('id', 'main')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request.headers.get('Authorization')))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('restaurant_info')
    .upsert({ ...body, id: 'main', updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
