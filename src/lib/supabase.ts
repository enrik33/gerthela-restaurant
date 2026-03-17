import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin function to query data
export async function getMenuItems() {
    const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('category', { ascending: true });

    if (error) throw error;
    return data;
}

export async function getRestaurantInfo() {
    const { data, error } = await supabase
        .from('restaurant_info')
        .select('*')
        .single();

    if (error) throw error;
    return data;
}

export async function getReviews() {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getAnnouncements() {
    const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}
