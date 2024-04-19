import React from 'react'
import { Card } from '@/ui/card'
import { CardsBanner } from '@/components/Cards/CardsBanner'
import { CardDefault } from '@/components/Cards/CardDefault'
import { MdAccountBox } from 'react-icons/md'
import { LucideUserCheck } from 'lucide-react'

const ProfileUser = async () => {
  return (
    <>
      <CardDefault
        title="Perfil"
        description="Resumo dados usuário"
        icon={<LucideUserCheck size={28} />}
      >
        <h1>TEst</h1>
      </CardDefault>
    </>
  )
}
export default ProfileUser
