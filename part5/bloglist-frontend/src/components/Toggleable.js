import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Toggleable = React.forwardRef ((props, ref) => {
    const [ visible, setVisible ] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

    return (
        <div>
            <div style={hideWhenVisible} >
                <button id="open-blog-form-btn" onClick={() => toggleVisible()} > {props.buttonLabel} </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={() => toggleVisible() }> Cancel </button>
            </div>
        </div>
    )

})

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = "Togglable"

export default Toggleable