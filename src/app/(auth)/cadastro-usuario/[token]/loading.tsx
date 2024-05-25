import LoadingPage from '@/components/Loadings/LoadingPage'

export default function Loading(): JSX.Element {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingPage pending={true} />
}
