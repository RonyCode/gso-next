import React from 'react'

import { CardModule } from '@/components/Cards/CardModule'
import IconBuild from '@/icons/IconBuild'
import IconCalendar from '@/icons/IconCalendar'
import IconCelular from '@/icons/IconCelular'
import IconCog from '@/icons/IconCog'
import IconGrafico from '@/icons/IconGrafico'
import IconList from '@/icons/IconList'
import IconOpenBook from '@/icons/IconOpenBook'
import IconPrivileges from '@/icons/IconPrivileges'
import IconSirene from '@/icons/IconSirene'

const ModulesOrganizacao = ({
  params,
}: {
  params: { sigla: string }
}): JSX.Element => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <div className="group">
            <CardModule
              title="Escalas"
              subtitle="Serviço de escala"
              link={`/${params?.sigla?.toLowerCase()}/escalas`}
              icon={<IconCalendar width={54} />}
            />{' '}
          </div>
          <CardModule
            title="Ocorrências"
            subtitle="Ocorrências"
            link={`/${params?.sigla?.toLowerCase()}/ocorrencias`}
            icon={<IconSirene width={58} />}
          />{' '}
          <CardModule
            title="Unidades"
            subtitle="Gerenciar unidades"
            link={`/${params?.sigla?.toLowerCase()}/unidades`}
            icon={<IconList width={58} />}
          />{' '}
          <CardModule
            title="Estatísticas"
            subtitle="Estatítiscas gerais"
            icon={<IconGrafico width={58} />}
          />{' '}
          <CardModule
            title="Aplicativo"
            subtitle="Novidades do nosso App"
            icon={<IconCelular width={60} />}
          />{' '}
          <CardModule
            title="Área do Gestor"
            subtitle="Serviço de gestão"
            icon={<IconCog width={58} />}
          />{' '}
          <CardModule
            title="Organizações"
            subtitle="Serviço de sua Organizacão"
            link={`/${params?.sigla?.toLowerCase()}/organizacao`}
            icon={<IconBuild width={54} />}
          />{' '}
          <CardModule
            title={'Minha Organização'}
            subtitle={'Detalhes'}
            link={`/${params?.sigla?.toLowerCase()}/minha-organizacao`}
            icon={<IconBuild width={54} />}
          />
          {/* <CardModule */}
          {/*  title="Adicionar Unidade" */}
          {/*  subtitle="Adicionar nova unidade" */}
          {/*  link={`/organizacao/${idcorporation}/nova-unidade`} */}
          {/*  icon={<IconBuildPlus width={58} className="ml-1" />} */}
          {/* /> */}
          {/* <CardModule */}
          {/*  title="Unidades" */}
          {/*  subtitle="Unidades da minha organização" */}
          {/*  link={`/organizacao/${idcorporation}/unidades`} */}
          {/*  icon={<IconList width={64} className="ml-1" />} */}
          {/* /> */}
          <CardModule
            title="Privilégios"
            subtitle="Gerenciar privilégios"
            link={`/${params?.sigla?.toLowerCase()}/privilegios`}
            icon={<IconPrivileges width={80} className="ml-1" />}
          />
          <CardModule
            title="Leis"
            subtitle="Acervo de leis "
            link={`/${params?.sigla?.toLowerCase()}/leis`}
            icon={<IconOpenBook width={80} className="stroke-foreground/60" />}
          />{' '}
        </div>
      </div>
    </>
  )
}
export default ModulesOrganizacao
