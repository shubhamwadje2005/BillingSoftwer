import React from 'react'

const Loading = () => {
    return <>
        <div className='position-fixed top-0 vh-100 vw-100 justify-content-center align-items-center bg-light'>
            <div>Please Wait... <div class="spinner-border text-primary"></div></div>
        </div>
    </>
}

export default Loading