import AuthenticationResponse from '@api/services/auth/models/responses/AuthenticationResponse'
import {atomWithStorage} from 'jotai/utils'

export const CredentialsAtom = atomWithStorage<AuthenticationResponse | null>('credentials', null)


