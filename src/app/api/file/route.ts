import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosProgressEvent } from 'axios'
import { execPercentageStore } from '@/stores/percentageStore'

const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
  const { loaded, total } = progressEvent
  const percent = Math.floor((loaded * 100) / total!)
  execPercentageStore.getState().actions.add(percent)
  if (percent < 100) {
    console.log(`${loaded} bytes of ${total} bytes. ${percent}%`)
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const token = request.headers.get('Authorization')

  const restp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_GSO}/services/upload`,
    formData,
    {
      onUploadProgress,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return NextResponse.json({
    Message: restp.data,
    percent: execPercentageStore.getState().state.percentage,
    status: 200,
  })
}
