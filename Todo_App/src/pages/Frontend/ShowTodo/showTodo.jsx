import React, { useEffect, useState } from 'react'
// import { useAuthContext } from 'context/AuthContext'
import { firestore } from 'config/firebase';
import { collection, query, getDocs, doc, deleteDoc, where, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from 'context/AuthContext';

export default function ShowTodo() {
    const [documents, setDocuments] = useState([])
    const [todo, setTodo] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthenticated } = useAuthContext()
    const { user } = useAuthContext()

    // Handle Onchange

    const onChangeHandle = (e) => {
        setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
    }


    // Fetching Document

    const fetchdocuments = async () => {
        if (!isAuthenticated) {
            return
        }
        setIsLoading(true)
        let array = []
        // const q = query(collection(firestore, "todos"));
        const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const data = doc.data()
            array.push(data)
        });
        setDocuments(array)
        setIsLoading(false)
    }

    // UseEffect

    useEffect(() => {
        fetchdocuments()
    }, [])


    // Handle Delete to delete Todo

    const handleDelete = async (todo) => {
        setIsProcessing(true)

        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            window.notify("Todo deleted successfully", 'success')

            const newDocuments = documents.filter((doc) => {
                return doc.id !== todo.id
            })

            setDocuments(newDocuments)

        } catch (err) {
            window.notify("Something went wrong.Todo not deleted.", 'error')
            console.log("Delete Todo Error: ", err);

        }
        setIsProcessing(false)
    }

    // Handle Update to Udpate Todo

    const handleUpdate = async () => {
        setIsProcessing(true)
        let formData = { ...todo }
        formData.createdAt = formData.createdAt;
        formData.dateModify = serverTimestamp()
        formData.modifyBy = {
            name: user.user.displayName,
            email: user.user.email,
            uid: user.user.uid
        }
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData, { merge: true });
            const newDocuments = documents.map((doc) => {
                if (doc.id === todo.id) {
                    return todo;
                }
                return doc
            })

            setDocuments(newDocuments)
            window.notify("TODO Updated successfully!", 'success');
        } catch (err) {
            window.notify("Something went wrong.Todo not Updated.", 'error')
            console.log("Delete Todo Error: ", err);
        }
        setIsProcessing(false)
    }


    return (
        <div className='container my-5'>
            <div className="row ">
                <div className="col">
                    <h2 className='text-center fw-bolder text-white pb-2'>TODOS</h2>

                    <div className="card p-3 p-md-4 p-lg-5" id='todo_card'>

                        <div className="table-responsive">
                            {!isAuthenticated ? (<h1 className='text-center'>You need to Login first to see your Todos</h1>) :
                                (!isLoading ?
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Status</th>
                                                {/* <th scope="col">Created At</th> */}
                                                {/* <th scope="col">Created By</th> */}
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {documents.map((todo, i) => {
                                                return <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{todo.title}</td>
                                                    <td>{todo.location}</td>
                                                    <td>{todo.description}</td>
                                                    <td>{(todo.status).toUpperCase()}</td>
                                                    {/* <td>{todo.createdAt}</td> */}
                                                    {/* <td>{todo.createdBy}</td> */}
                                                    <td>
                                                        <button className='btn btn-info btn-sm m-1' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setTodo(todo) }} >{!isProcessing ? 'Edit' : <div className='spinner-border spinner-border-sm'></div>}</button>
                                                        <button className='btn btn-danger btn-sm' onClick={() => { handleDelete(todo) }} disabled={isProcessing}>{!isProcessing ? 'Delete' : <div className='spinner-border spinner-border-sm'></div>}</button>
                                                    </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                    : <div className="text-center"> <div className='spinner-grow'></div></div>)
                            }


                            {/* Updating Todo Modal of Bootstrap */}

                            <div className="modal fade" id="exampleModal" >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-3 fw-4" style={{ textDecoration: 'underline' }}>Updating Todo</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col">
                                                    <form action="">
                                                        <div className="col d-flex flex-row">
                                                            <h5 className='me-2 mt-1'>Title:</h5>
                                                            <input type="text" className='form-control' value={todo.title} id='title' name='title' onChange={onChangeHandle} />
                                                        </div>
                                                        <div className="col my-2 d-flex flex-row">
                                                            <h5 className='me-2 mt-1'>Location:</h5>
                                                            <input type="text" className='form-control' value={todo.location} id='location' name='location' onChange={onChangeHandle} />
                                                        </div>
                                                        <div className="col my-2 d-flex flex-row">
                                                            <h5 className='me-2 mt-1'>Status:</h5>
                                                            <select name="status" className='form-control' value={todo.status} onChange={onChangeHandle} id="">
                                                                <option value="Active">Active</option>
                                                                <option value="InActive">InActive</option>
                                                            </select>

                                                        </div>
                                                        <div className="col d-flex flex-row">
                                                            <h5 className='me-2 mt-1'>Description:</h5>
                                                            <textarea rows='6' className='form-control' value={todo.description} id='description' name='description' onChange={onChangeHandle} />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" className="btn btn-success fw-4" data-bs-dismiss="modal" onClick={handleUpdate} >Update Todo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
