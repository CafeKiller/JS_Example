import {Component} from "react";
import PropTypes from "prop-types";
import CommentInput from "../components/CommentInput"
import { addComments } from "../reducers/comments";
import { connect } from "react-redux";

// 用户输入组件
class CommentInputContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func,
    }
    constructor() {
        super();
        this.state = { username: "" }
    }

    componentWillMount () {
        this._loadUsername()
    }

    _loadUsername() {
        const username = localStorage.getItem("username")
        if (username) {
            this.setState({username: username})
        }
    }
    _saveUsername(username){
        localStorage.setItem("username", username)
    }

    // 处理提交
    handleSubmitComment(comment) {

        if (!comment) return
        if (!comment.username) return alert("请输入用户名")
        if (!comment.content) return alert("请输入评论")

        const { comments } = this.props
        const newComments = [...comments, comment]
        localStorage.setItem("comments", JSON.stringify(newComments))

        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        } 

    }

    render() {
        return (
            <CommentInput 
            username = {this.state.username}
            onUserNameInputBlur = {this._saveUsername.bind(this)}
            onSubmit = { this.handleSubmitComment.bind(this) }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComments(comment))
        }
    }
}


export default connect(
    mapStateToProps, 
    mapDispatchToProps
    )(CommentInputContainer)