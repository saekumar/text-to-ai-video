import { NextResponse } from 'next/server'
import db from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'

export async function GET(req) {
  const { userId: clerkId } = getAuth(req) // Extract Clerk user ID
  console.log('clerkId:', clerkId)

  if (!clerkId) {
    return NextResponse.json({ error: 'clerkId is required' }, { status: 400 })
  }

  try {
    // Ensure `clerkId` matches the schema field in `VideoData`
    const videoList = await db.videoData.findMany({
      where: { clerkId }, // Ensure this matches your schema field
    })
    console.log('Video List:', videoList)

    return NextResponse.json(videoList, { status: 200 })
  } catch (error) {
    console.error('Error fetching video list:', error)

    return NextResponse.json(
      { error: 'Failed to fetch video list', details: error.message },
      { status: 500 }
    )
  }
}
