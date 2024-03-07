import { Component } from "react";
import PropTypes from "prop-types"

export const connect = (mapStateProps) => (WrapperComponent) => {

    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor () {
            super()
            this.state = { allProps: {} }
        }

        // �� React18 ��ʹ�� componentWillMount ����̨���������, ��Ϊ������������Ѿ���������
        // ʹ�� UNSAFE_componentWillMount ����̨�����������, ������������� React �ٷ��ǲ��Ƽ�ʹ�õ���.
        UNSAFE_componentWillMount () {
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => this._updateProps())
        }

        _updateProps () {
            const { store } = this.context
            let stateProps = mapStateProps(store.getState(), this.props) // ���⴫�� props ,��ȡ���ݸ��ӷ���
            this.setState({
                allProps: {
                    ...stateProps,
                    ...this.props,
                }
            })
        }

        render () {
            // {...stateProps} ��˼�ǰ�����������������ȫ��ͨ�� `props` ��ʽ���ݽ�ȥ
            return <WrapperComponent {...this.state.allProps} />
        }
    }

    return Connect
}