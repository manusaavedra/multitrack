import { Player } from '@/components'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sequentracks</title>
      </Head>
      <Player />
    </>
  )
}
