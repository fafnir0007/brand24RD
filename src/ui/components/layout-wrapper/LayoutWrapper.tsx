import Header from '@/ui/components/header/Header';
import SideBar from '@/ui/components/sidebar/Sidebar';
import sideBar from '@/utils/mock/sideBar';
import user from '@/utils/mock/header';

type Props = {
    children: React.ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <section>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SideBar data={sideBar} />
          <div style={{ width: '100%' }}>
              <Header user={user}/>
              {children}
          </div>
      </div>
    </section>
  )
}

export default LayoutWrapper