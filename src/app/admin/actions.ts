'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { updateChatSession } from '@/lib/notion';




export async function toggleAiModeAction(lineUserId: string, currentMode: 'AI' | 'Human') {
    const newMode = currentMode === 'AI' ? 'Human' : 'AI';
    await updateChatSession(lineUserId, newMode);
    revalidatePath('/admin/agent');
}

export async function refreshNotionData() {
    console.log('[Admin Action] Manually refreshing Notion data cache...');
    // @ts-ignore - Next.js version specific signature
    revalidateTag('notion-data', 'default');
    revalidatePath('/admin/settings');
    revalidatePath('/api/line'); // Ensure API route is also aware if it caches anything
}
