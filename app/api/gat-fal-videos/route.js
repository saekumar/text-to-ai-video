import { NextResponse } from 'next/server'
import db from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'
export async function GET(req) {
  const { userId: clerkId } = getAuth(req) // Retrieve clerkId
  if (!clerkId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    })
  }

  try {
    const videoList = await db.falVideo.findMany({
      where: { clerkId }, // Ensure this matches the schema field name
    })
    console.log('Video List:', videoList)
    return NextResponse.json(videoList)
  } catch (error) {
    console.error('Error fetching video list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video list' },
      { status: 500 }
    )
  }
}
