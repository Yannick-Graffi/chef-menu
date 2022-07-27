import React, { useEffect, useState } from 'react';
import '../styles/Table.css';
import axios from 'axios';
<<<<<<< HEAD:Front_End/src/pages/Table.js
import TablePreview from '../components/TablePreview/TablePreview';
import NewTableForm from '../components/NewTableForm/NewTableForm';
=======
import TablePreview from '../../components/TablePreview/TablePreview';
import NewTableForm from '../../components/NewTableForm/NewTableForm';
// import QRCode from '../components/QRCode';
>>>>>>> fef0b635b6b999004bcfad270120cfaab638c880:Front_End/src/pages/scripts/Table.js

function Table() {
    const [tables,setTables] = useState([]);
    const [table, setTable] = useState({
        number:""
    });
    const [message, setMessage] = useState("")




    // const [display, setDisplay] = useState(false);
    // const [formData, setFormData] = useState({
    //     number: "",

    // })

    useEffect( () => {
        async function getTable(){
            const result = await axios.get("http://localhost:3002/table")
            setTables(result.data)
        }
        getTable()
    }, [])

    async function handleDelete(id){
        await axios.delete(`http://localhost:3002/table/${id}`)


        const filteredTables = tables.filter(table => table._id !== id)

         setTables(filteredTables)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let accesToken = localStorage.getItem('token')
        let config = {
            headers: {'Authorization' : `Bearer ${accesToken}`}
        }
        await axios
        .post(`http://localhost:3002/table/`, table, config)
        .then(res => {
            setMessage("")
            console.log("response = ", res.data);
        })
        .catch(err=> {
            console.log(err)
        })
    }

    // function displayUpdate(id) {
    //     if (display) {
    //         setDisplay(false)
    //     } else {
    //         const result = tables.find(table => table._id === id)
    //         setTable(result)
    //         setFormData(result)

    //         setDisplay(true)
    //     }
    // }

    function handleChange(e) {
        e.preventDefault();
        setTable({
            number:e.target.value
        })
    }



    return (

        <h2>chef-sMenu</h2>,

       <div className="publish-container">
            <h2>Bienvenue sur votre page table</h2>
            <p>Ici, vous pourrez ajouter une table</p>
            <NewTableForm
             onSubmit={handleSubmit}
             onChange={handleChange}
        />
        <span style={{color:"#ff0000"}}>{message}</span>

            {[tables.map(
                (table) => (
                    <TablePreview
                        key={table._id}
                        table={tables}
                        onDelete={handleDelete}
                        //onUpdate={displayUpdate}
                    />
                )
            )]}
        </div>
    );
}

export default Table;

