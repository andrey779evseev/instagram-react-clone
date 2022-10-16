import { memo } from 'react'
import { NavLink } from 'react-router-dom'

type PropsType = {
	signIn?: boolean
}

const ChangeAuthorizationBtn = (props: PropsType) => {
	const { signIn = false } = props
	return (
		<div className='flex-center w-full h-16 rounded-sm border border-gray10'>
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
