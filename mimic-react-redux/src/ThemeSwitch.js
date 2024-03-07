import React , { Component } from "react";
import PropTypes from "prop-types";

class ThemeSwitch extends Component {

    static contextTypes = {
        store: PropTypes.object
    }

    constructor () {
        super()
        this.state = { themeColor: "" }
    }

    // ����ʱ����
    componentDidMount () {
        const { store } = this.context
        this._updateThemeColor()
        // �󶨼���
        store.subscribe(() => this._updateThemeColor())
    }

    // ����������ɫ
    _updateThemeColor () {
        const { store } = this.context // �� context �л�ȡ״̬ store
        const state = store.getState()
        this.setState({ themeColor: state.themeColor })
        
    }

    // ������ɫ�л�
    handleSwitchColor (color) {
        const { store } = this.context
        store.dispatch({
            type: "CHANGE_COLOR",
            themeColor: color
        }) 
    }

    render () {
        return (
            <div>
                <button 
                    style={{ color:this.state.themeColor }}
                    onClick={this.handleSwitchColor.bind(this, "Tomato")}>Tomato</button>
                
                <button 
                    style={{ color:this.state.themeColor }}
                    onClick={this.handleSwitchColor.bind(this, "Skyblue")}>Skyblue</button>
            </div>
        )
    }
}

export default ThemeSwitch