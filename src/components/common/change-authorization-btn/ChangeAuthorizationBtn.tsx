import './ChangeAuthorizationBtn.scss'
import {NavLink} from 'react-router-dom'
import { memo } from 'react'

type PropsType = {
  signIn?: boolean
}

const ChangeAuthorizationBtn = memo((props: PropsType) => {
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
})

export default ChangeAuthorizationBtn
