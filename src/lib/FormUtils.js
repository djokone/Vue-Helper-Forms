import helpersInput from '@/helpersInput'
import helpersForm from '@/HelpersForm'
import { isEmpty } from 'lodash'

// Create a root container
let createRootContainer = function (obj, create, childrens) {
  let vnodeArray = []
  vnodeArray.push(childrens)
  return create(
    obj.tag, {
    },
    vnodeArray
  )
}

// Lunch the while in the root component object for dispatching
let dispatchRoot = function (obj, create, input = obj, container = true) {
  let vnodeArray = []
  if (typeof input.inputs !== 'undefined') {
    input.inputs.forEach((inp, key) => {
      if (dispatch(obj, create, inp)) {
        vnodeArray.push(dispatch(obj, create, inp))
      }
    })
  }
  if (typeof input.forms !== 'undefined') {
    input.forms.forEach((inp, key) => {
      if (dispatch(obj, create, inp)) {
        vnodeArray.push(dispatch(obj, create, inp))
      }
    })
  }

  if (obj.root && container) {
    return createRootContainer(obj, create, createFormContainer(obj, create, vnodeArray))
  } else if (container) {
    return createFormContainer(obj, create, vnodeArray)
  } else if (!isEmpty(vnodeArray)) {
    return vnodeArray
  } else {
    return false
  }
}

// Lunch the right function in a while
let dispatch = function (obj, create, input) {
  // console.log(obj.getType(input))
  if (obj.getType(input) === 'text' || obj.getType(input) === 'password') {
    return createInput(obj, create, input)
  } else if (obj.getType(input) === 'form') {
    return createHelperForm(obj, create, input)
  } else if (obj.getType(input) === 'groupe') {
    return createContainer(obj, create, input)
  } else { return false }
}

// create a custom input
let createInput = function (obj, create, input) {
  return create(
    helpersInput,
    {
      'class': [input.class],
      props: {
        label: obj.getLabel(input),
        name: obj.getName(input),
        type: obj.getType(input),
        placeholder: obj.getPlaceholder(input)
      }
    }
  )
}
let createHelperForm = function (obj, create, input) {
  let allProps = {}
  if (obj.hasForms(input) && obj.getType(input)) {
    allProps = {
      inputs: input.forms,
      root: false,
      hasToBeGrouped: obj.hasToBeGroup(input)
    }
  }
  console.log('create recursive form')
  return create(
    helpersForm,
    {
      props: allProps
    }
  )
}

let createContainer = function (obj, create, input, childrens) {
  childrens = childrens || []
  let classes = []
  let classe = input.class ? input.class : ''
  classes.push(classe)
  let getRoot = dispatchRoot(obj, create, input, false)
  if (getRoot) {
    // console.log(getRoot)
    childrens = getRoot
  }
  return create(
    'div',
    {
      'class': [classes]
    },
    childrens
  )
}

let createFormContainer = function (obj, create, childrens) {
  return create(
    'form',
    {
      'class': ['forms']
    },
    childrens
  )
}

export default dispatchRoot
