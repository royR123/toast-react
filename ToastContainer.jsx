import React, { useEffect, useState } from 'react'
import './ToastContainer.css';
function ToastContainer() {
    const [toasts , setToasts] = useState([]);
    let timer ;

    const mp = new Map();
    useEffect(() => {
        return () => {
            for(let ky in mp){
                clearTimeout(mp[ky]);
            }
        }
    },[])
    const handleShowToast = (message , type) => {
        setToasts(prev => {
            console.log(new Date().getTime());
            console.log(prev);
            const new_id = new Date().getTime();
            const timer = setTimeout(() => {
                handleCancel(new_id);
            },10000);
            mp.set(new_id , timer);
            return [...prev , {
                message : message , 
                type : type  , 
                id : new_id,
                
            }]
        })
    }
    const handleCancel = (id) => {
        const timer = mp.get(id);
        clearTimeout(timer);
        mp.delete(id);
        setToasts(prevToasts => {

            return prevToasts.filter(toast => {

                return toast.id !== id;
            })
        })
    }
    return (
        <div>

            <h1>ToastContainer
            </h1>
            <div className="toast-container">
                {toasts.map(toast => {
                    return (<div key = {toast.id} className={`toast ${toast.type}`} >
                        {toast.message} <span onClick={() => {
                            handleCancel(toast.id);
                        }}>X</span>
                    </div>)
                })
                }
            </div>
            <button onClick={() => {
                handleShowToast("Successfully submitted" , "success")
            }}
            >Success Toast</button>

            <button onClick={() => {
                handleShowToast("Got the Info" , "info")
            }}>Info Toast</button>
            <button onClick={() => {
                handleShowToast("Warning..." , "warning")
            }}>Warning Toast</button>
            <button onClick={() => {
                handleShowToast("error occured" , "error")
            }}>Error Toast</button>
        </div>
    )
}

export default ToastContainer
