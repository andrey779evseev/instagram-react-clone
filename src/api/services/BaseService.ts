import axios, {AxiosRequestConfig} from 'axios'
import {BASE_URL} from '@api/common/ApiConstants'
import {AccessTokenAtom} from '@store/atoms/AccessTokenAtom'
import {EnumHttpMethod} from '@api/common/EnumHttpMethod'
import SendParams from '@api/common/SendParams'
import {readAtom} from '@utils/JotaiNexus'
import {logout} from '@utils/Logout'

const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: status => {
    return status < 300;
  }
})

instance.interceptors.response.use(res => {
  return res
}, err => {
  if(err.response.status === 401)
    logout()
  return Promise.reject(err)
})

const getConfig = async (params: SendParams): Promise<AxiosRequestConfig | undefined> => {
  const config: AxiosRequestConfig = {
    headers: {
    }
  }
  if(!params.WithToken && !params.IsFile) return undefined
  const token = await readAtom(AccessTokenAtom)
  if(token)
    config.headers!.Authorization = `Bearer ${token}`
  if(params.IsFile)
    config.headers!['content-type'] = 'multipart/form-data'
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
      req = instance[params.Method]<T>(params.Path, params.Req, config)
      break
  }
  return req
    .then(res => res.data)
}
