import axios from 'axios'
const qs = require('qs')
const server = function (config, data) {
  axios.defaults.baseURL = config.baseURL
  axios.interceptors.request.use(config.requestInterceptor)
  axios.interceptors.response.use(config.responseInterceptor, config.responseInterceptor)
  let server = {}
  server = setBaseServerMethod(server)
  const paths = data.paths
  if (paths) {
    Object.entries(paths).forEach(([pathKey, pathValue]) => {
      Object.entries(pathValue).forEach(([method, methodValue]) => {
        const parameters = pathValue[method].parameters ? pathValue[method].parameters : []
        const pathParameters = parameters.filter(param => param.in === 'path')
        const queryParameters = parameters.filter(param => param.in === 'query')
        let dataModel = null
        let isMultipartFormData = false
        if (methodValue.requestBody) {
          isMultipartFormData = methodValue.requestBody.content['multipart/form-data']
          if (isMultipartFormData) {
            dataModel = new FormData()
          } else {
            const schema =
              methodValue.requestBody.content['text/json'].schema.$ref
            if (schema) {
              dataModel = retrieveDataModel(schema, data)
            }
          }
        }
        const methodName = generateMethodName(methodValue, pathKey, method)
        server[methodName] = function (payload) {
          const query = this.generateQueryModel(queryParameters, payload)
          const data = this.generateDataModel(dataModel, payload)
          const currentPath = this.generateUrl(pathKey, pathParameters, payload)
          return axios.request({
            url: currentPath,
            method: method,
            data: data,
            params: query,
            paramsSerializer: function (params) {
              return qs.stringify(params, { arrayFormat: 'repeat' })
            }
          })
        }
      })
    })
  }
  return server
}
const setBaseServerMethod = function (server) {
  server.generateQueryModel = function generateQueryModel (queryParameters, payload) {
    const query = {}
    queryParameters.forEach(pathQuery => {
      if (payload && !(payload[pathQuery.name] === undefined || payload[pathQuery.name] === null)) {
        query[pathQuery.name] = payload[pathQuery.name]
        delete payload[pathQuery.name]
      }
    })
    return query
  }
  server.generateDataModel = function generateDataModel (dataModel, payload) {
    if (dataModel && dataModel.constructor && dataModel.constructor.name === 'FormData') {
      dataModel = new FormData()
      if (Array.isArray(payload)) {
        payload.map((item) => {
          dataModel.append('files', item)
        })
      }
      dataModel.append('files', payload)
      return dataModel
    } else {
      const model = {}
      dataModel && Object.keys(dataModel).forEach(property => {
        model[property] = payload[property]
        delete payload[property]
      })
      return model
    }
  }
  server.generateUrl = function generateUrl (path, pathParameters, payload) {
    let currentPath = path
    pathParameters.forEach(pathParam => {
      currentPath = currentPath.replace(`{${pathParam.name}}`, payload[pathParam.name])
      delete payload[pathParam.name]
    })
    return currentPath
  }
  return server
}
const retrieveDataModel = function (schema, result) {
  const path = schema.slice(2)
  const validPath = path.replace(/\//g, '.')
  const data = getNestedJsonValue(result, validPath)
  return data.properties
}
const generateMethodName = function (methodValue, currentPath, method) {
  const operationId = methodValue.operationId
  let methodName = null
  if (operationId) {
    methodName = operationId
  } else {
    const tagName = capitalizeFirstLetter(methodValue.tags[0])
    const pathNameArray = currentPath.slice(1).split('/')
    let validPathName = ''
    pathNameArray.forEach((pathName, index) => {
      const name = pathName.replace('{', '').replace('}', '')
      validPathName += capitalizeFirstLetter(name)
    })
    methodName = method.toLowerCase() + tagName + validPathName
  }
  return methodName
}
const capitalizeFirstLetter = function (name) {
  const capitalizedFirstLetterName = name.charAt(0).toUpperCase() +
  name.slice(1).toLowerCase()
  return capitalizedFirstLetterName
}
const getNestedJsonValue = function (result, path) {
  const parts = path.split('.')
  if (parts.length > 1) {
    return getNestedJsonValue(result[parts[0]], parts.splice(1).join('.'))
  } else {
    return result[parts[0]]
  }
}
export default server
