import { type NextRequest, NextResponse } from 'next/server'

import { execPercentageStore } from '@/stores/percentageStore'
import axios, { type AxiosProgressEvent } from 'axios'

const onUploadProgress = (progressEvent: AxiosProgressEvent): void => {
  const { loaded, total } = progressEvent
  let percent = 0
  if (total != null) {
    percent = Math.floor((loaded * 100) / total)
  }
  execPercentageStore.getState().actions.add(percent)
  if (percent < 100) {
    console.log(`${loaded} bytes of ${total} bytes. ${percent}%`)
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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
