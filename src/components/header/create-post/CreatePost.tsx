import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { memo, useMemo, useState } from 'react'
import { Crop } from 'react-image-crop'
import Modal from '@components/common/modal/Modal'
import ConfirmationModal from '@components/common/modal/confirmation-modal/ConfirmationModal'
import Switch from '@components/common/switch/Switch'
import { base64ToBlob } from '@utils/Base64ToBlob'
import { cropImageViaCanvas } from '@utils/CropImageViaCanvas'
import { fileToUrl } from '@utils/FileToUrl'
import useWindowSize from '@hooks/UseWindowSize'
import { AccountService } from '@api/services/account/AccountService'
import { PostService } from '@api/services/post/PostService'
import CreatePostHeader from './CreatePostHeader'
import CreatePostStepFour from './steps/CreatePostStepFour'
import CreatePostStepOne from './steps/CreatePostStepOne'
import CreatePostStepThree from './steps/CreatePostStepThree'
import CreatePostStepTwo from './steps/CreatePostStepTwo'

type PropsType = {
	onClose: () => void
}

export type CreatePostStepType = {
	AvailableBack: boolean
	NextTitle: string | null
	Title: string
}

const steps: CreatePostStepType[] = [
	{
		AvailableBack: false,
		NextTitle: null,
		Title: 'Create new post',
	},
	{
		AvailableBack: true,
		NextTitle: 'Next',
		Title: 'Crop',
	},
	{
		AvailableBack: true,
		NextTitle: 'Share',
		Title: 'Create new post',
	},
	{
		AvailableBack: false,
		NextTitle: null,
		Title: 'Post shared',
	},
]

const CreatePost = (props: PropsType) => {
	const { onClose } = props

	const [crop, setCrop] = useState<Crop>()
	const [imageWidth, setImageWidth] = useState<number>(0)
	const [currentStep, setCurrentStep] = useState(1)
	const [image, setImage] = useState<string | null>(null)
	const [isShowDiscardModal, setIsShowDiscardModal] = useState(false)
	const [description, setDescription] = useState('')
	const [filename, setFilename] = useState('')
	const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null)
	const [, windowHeight] = useWindowSize()
	const qc = useQueryClient()

	const { data: user } = useQuery(['user'], AccountService.GetUser)
	const createPostMutation = useMutation(PostService.CreatePost, {
		onSuccess: () => {
			setCurrentStep((step) => step + 1)
			qc.invalidateQueries(['mini-posts', user?.Id])
		},
	})

	const symbolsCount = useMemo(() => description.length, [description])
	const step = useMemo(() => steps[currentStep - 1], [currentStep])
	const isDisabled = useMemo(() => {
switch (currentStep) {
			case 2:
				return !crop || !imageWidth || !image
			case 3:
				return symbolsCount > 2200
			default:
				return false
		}
	}, [crop, imageWidth, image])

	const onUpload = (file: File) => {
		const { url } = fileToUrl(file)
		setImage(url)
		setFilename(file.name)
		const img = new Image()
		img.onload = () => {
			setCurrentStep((step) => step + 1)
		}
		img.src = url
	}

	const next = () => {
		if (isDisabled) return
		switch (currentStep) {
			case 2:
				(getCroppedImg() as Promise<string>).then((cropped) => {
					const blob = base64ToBlob(cropped!)
					setCroppedImageBlob(blob)
					const { url } = fileToUrl(blob)
					setImage(url)
					setCurrentStep((step) => step + 1)
				})
				break
			case 3: {
				const formData = new FormData()
				formData.append('file', croppedImageBlob!, filename)
				createPostMutation.mutate({ Data: formData, Description: description })
				break
			}
		}
	}

	const back = () => {
		switch (currentStep) {
			case 2:
			case 3:
				setIsShowDiscardModal(true)
				break
		}
	}

	const discardChanges = () => {
		setImage(null)
		setCurrentStep(1)
		setCrop(undefined)
		setImageWidth(0)
		setDescription('')
		setFilename('')
		setIsShowDiscardModal(false)
	}

	const getCroppedImg = () => {
		if (!imageWidth || !crop || !image) return ''
		return cropImageViaCanvas(crop, imageWidth, image)
	}

	return (
		<Modal
			width='fit-content'
			height={windowHeight - 100}
			maxHeight={currentStep === 2 ? 'unset' : 400}
			onClose={onClose}
			rounded
		>
			<div className='w-full h-full flex flex-col'>
				<CreatePostHeader
					back={back}
					next={next}
					currentStep={currentStep}
					step={step}
					isDisabled={isDisabled}
					isLoading={createPostMutation.isLoading}
				/>
				<Switch condition={currentStep}>
					<CreatePostStepOne value={1} onUpload={onUpload} />
					<CreatePostStepTwo
						value={2}
						crop={crop}
						image={image!}
						setCrop={setCrop}
						setImageWidth={setImageWidth}
					/>
					<CreatePostStepThree
						value={3}
						description={description}
						setDescription={setDescription}
						symbolsCount={symbolsCount}
					/>
					<CreatePostStepFour value={4} />
				</Switch>
			</div>
			<ConfirmationModal
				visible={isShowDiscardModal}
				onClose={() => setIsShowDiscardModal(false)}
				title='Discard post?'
				firstActionTitle='Discard'
				secondActionTitle='Cancel'
				description="If you leave, your edits won't be saved."
				firstAction={discardChanges}
				secondAction={() => setIsShowDiscardModal(false)}
				color='red'
			/>
		</Modal>
	)
}

export default memo(CreatePost)
