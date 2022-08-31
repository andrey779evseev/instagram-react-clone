import './ChangeAuthorizationBtn.scss'
import {NavLink} from 'react-router-dom'

type PropsType = {
  signIn?: boolean
}

const ChangeAuthorizationBtn: React.FC<PropsType> = (props) => {
  const {signIn = false} = props
  return (
    <div className='change_authorization_btn'>
      <div>
        <span className="question">{signIn ? 'You an account?' : 'You don’t an account?'}</span>
        <NavLink
          to={signIn ? '/login' : '/registration'}
          className="text-cobalt cursor-pointer"
        >
          {signIn ? 'Log in' : 'Sign Up'}
        </NavLink>
      </div>
    </div>
  )
}

export default ChangeAuthorizationBtn
