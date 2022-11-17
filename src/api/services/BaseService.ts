import axios, { AxiosRequestConfig } from 'axios'
import { readAtom } from '@utils/JotaiNexus'
import { logout } from '@utils/Logout'
import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import SendParams from '@api/common/SendParams'
import { refreshAccessToken } from '@api/utils/RefreshToken'
import { AccessTokenAtom } from '@store/atoms/AccessTokenAtom'

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	validateStatus: (status) => {
		return status < 300
	},
})

instance.interceptors.response.use(
	(res) => {
		return res
	},
	(err) => {
		if (err.response.status === 401) {
			if (err.response.config.url?.includes('refresh-token')) logout()
			else refreshAccessToken()
		}
		return Promise.reject(err)
	}
)

const getConfig = async (
	params: SendParams
): Promise<AxiosRequestConfig | undefined> => {
	const config: AxiosRequestConfig = {
		headers: {},
	}
	if (!params.WithToken) return undefined
	const token = await readAtom(AccessTokenAtom)
	if (token) config.headers!.Authorization = `Bearer ${token}`
	if (typeof params.Body === 'string') config.headers!['Content-Type'] = 'application/json-patch+json'
	if (params.QueryParams !== null) config.params = params.QueryParams
	return config
}

export const customFetch = async <T = void>(params: SendParams): Promise<T> => {
	let req = null
	params = new SendParams(params)
	const config = await getConfig(params)
	switch (params.Method) {
		case EnumHttpMethod.Get:
			req = instance.get<T>(params.Path, config)
			break
		case EnumHttpMethod.Post:
		case EnumHttpMethod.Put:
			req = instance[params.Method]<T>(params.Path, params.Body, config)
			break
	}
	return req.then((res) => res.data)
}
