import React, { Component } from 'react';
import PropTypes from "prop-types"
import { createRoot } from 'react-dom/client';
import Header from './Header';
import Content from './Content';

function createStore (reducer) {
  let state = null
  // ��������
  const listeners = []
  // ��Ϣ���Ĵ���
  const subscribe = (listener) => listeners.push(listener)
  // ��ȡ״̬
  const getState = () => state
  // ״̬����
  const dispatch = (action) => {
    // ÿ���޸ĺ�����ݶ���ͬ��, ��Ҫ���и��Ǵ���
    state = reducer(state, action) 
    // �������� ���ĵ��߼�����
    listeners.forEach((listener)=> listener())
  }
  // ��ʼ�� store
  dispatch({})
  return { getState, dispatch, subscribe }
}
// theme ������
const themeRender = (state, action) => {
  if (!state) return {
    themeColor: "Orange",
  }
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeRender)

class Index extends Component {
  
  static childContextTypes = {
    store: PropTypes.object
  }

  // ʹ�� context ����״̬ store
  getChildContext () {
    return { store } 
  }

  render () {
    return (
      <div>
        <Header></Header>
        <Content></Content>
      </div>
    )
  }
}

// ReactDOM.render(
//   <Index/>,
//   document.getElementById("root")
// )

const root = createRoot(document.getElementById('root'))
root.render(<Index/>)


