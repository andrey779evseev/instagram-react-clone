import Header from '@components/header/Header'
import {Outlet} from 'react-router-dom'


const Layout: React.FC = () => {
  return (
    <main className='flex flex-col items-center'>
      <Header/>
      <div className='content'>
        <Outlet/>
      </div>
    </main>
  )
}


export default Layout
