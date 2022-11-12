import { atomWithStorage } from 'jotai/utils'
import CredentialsModel from '@api/common/models/credentials/CredentialsModel'

export const CredentialsAtom = atomWithStorage<CredentialsModel | null>(
	'credentials',
	null
)
