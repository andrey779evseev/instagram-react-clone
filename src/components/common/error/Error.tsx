import { memo } from 'react'

type PropsType = {
	error: string | string[]
}

const Error = (props: PropsType) => {
	const { error } = props
	if (!error || error === '') return <></>
	return (
		<div className='mt-2.5'>
			{typeof error === 'string' ? (
				<div className='text-red mt-[10px] w-full px-5 text-center text-xs'>
					{error}
				</div>
			) : (
				<>
					{error.map((err, i) => (
						<div
							className='text-red !m-0 mt-[10px] w-full px-5 text-center text-xs'
							key={err}
						>
							{i + 1}) {err}
						</div>
					))}
				</>
			)}
		</div>
	)
}

export default memo(Error)
