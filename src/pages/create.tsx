import NavBar from '../components/NavBar/index';
import { useAppDispatch } from '../redux/reduxHooks';
import CreateBlog from '../screens/CreateBlog/index';
export default function Home() {
  const dispatch = useAppDispatch()

  return (
    <>
      <NavBar />
      <CreateBlog/>
    </>
  )
}
