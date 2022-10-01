import CredentialsModel from '@api/common/models/responses/CredentialsModel'
import {atomWithStorage} from 'jotai/utils'

export const CredentialsAtom = atomWithStorage<CredentialsModel | null>('credentials', null)


