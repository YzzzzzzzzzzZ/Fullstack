import axios from 'axios'

const baseURL = '/api/persons'

export const getPerson = async () => {
  const requst = axios.get(`${baseURL}`)
  const r = await requst
  return r.data
}

export const createPerson = async (params) => {
  const requst = axios.post(`${baseURL}`, params)
  const r = await requst
  return r.data
}

export const removePerson = async (id) => {
  const requst = axios.delete(`${baseURL}/${id}`)
  const r = await requst
  return r.data
}

export const updatePerson = async (params) => {
  const requst = axios.put(`${baseURL}/${params.id}`, params)
  const r = await requst
  return r.data
}
