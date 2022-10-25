import { memo } from 'react'
import { NavLink } from 'react-router-dom'

type PropsType = {
	signIn?: boolean
}

const ChangeAuthorizationBtn = (props: PropsType) => {
	const { signIn = false } = props
	return (
		<div className='flex-center border-gray10 w-full h-16 rounded-sm border'>
			<div>
				<span className='mr-[6px]'>
					{signIn ? 'You an account?' : `You don't an account?`}
				</span>
				<NavLink
					to={signIn ? '/login' : '/registration'}
					className='text-cobalt cursor-pointer'
				>
					{signIn ? 'Log in' : 'Sign Up'}
				</NavLink>
			</div>
		</div>
	)
}

export default memo(ChangeAuthorizationBtn)
