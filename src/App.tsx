import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { SignUp } from "./page/visitor/signup"
import { Index } from './page/visitor'
import { Login } from './page/visitor/login'
import { Moh } from './page/moh'
import { Admin } from './page/admin'
import { ManageUser } from './page/admin/user/user'
import { AdminProductManagement } from './page/admin/product'
import { Industry } from './page/industry'
import { IndustryProduct } from './page/industry/product'
import { MohProductManagement } from './page/moh/product'
import { MohPredictionHistory } from './page/moh/prediction'
import { Setting } from './component/setting'
import { AuthenticationProvider } from './auth'
function App() {

  return (
    <>
      <Router >
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/setting' element={<AuthenticationProvider><Setting/></AuthenticationProvider>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/moh' element={<AuthenticationProvider><Moh/></AuthenticationProvider>}/>
          <Route path='/moh/product' element={<AuthenticationProvider><MohProductManagement/></AuthenticationProvider>}/>
          <Route path='/moh/prediction' element={<AuthenticationProvider><MohPredictionHistory/></AuthenticationProvider>}/>

          <Route path='/admin' element={<AuthenticationProvider><Admin/></AuthenticationProvider>}/>
          <Route path='/admin/user' element={<AuthenticationProvider><ManageUser/></AuthenticationProvider>}/>
          <Route path='/admin/product' element={<AuthenticationProvider><AdminProductManagement/></AuthenticationProvider>}/>

          <Route path='/industry' element={<AuthenticationProvider><Industry/></AuthenticationProvider>}/>
          <Route path='/industry/product' element={<AuthenticationProvider><IndustryProduct/></AuthenticationProvider>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
