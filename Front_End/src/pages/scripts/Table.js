import React, { useEffect, useState } from 'react';
import '../styles/Table.css';
import axios from 'axios';
import TablePreview from '../../components/TablePreview/TablePreview';
import NewTableForm from '../../components/NewTableForm/NewTableForm';

function Table() {
    const [tables,setTables] = useState([]);
    const [table, setTable] = useState({
        number:""
    });
    const [message, setMessage] = useState("");
    const [display, setDisplay] = useState(false);

    let accesToken = localStorage.getItem('token');
    let config = {
        headers: {'Authorization' : `Bearer ${accesToken}`}
    };

    useEffect( () => { 
        // récupération du token et envoi dans l'entête de la requête
        let accesToken = localStorage.getItem('token');
        let config = {
            headers: {'Authorization' : `Bearer ${accesToken}`}
        };

        //requête pour récupérer les tables enregistré par le restaurateur pour 
        //le restaurant sur lequel il est connecté. 

        async function getTable(){
            await axios
                .get("http://localhost:3002/table", config)
                .then(res => {
                    const tableAsc = [...res.data].sort((a, b) => a.number > b.number); //Tri pour afficher les tables dans l'ordre croissant 
                    setTables(tableAsc)
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
        getTable()
    }, [])

    //Suppression de la table en fonction de l'id de celle-ci récupérée 
    //depuis le component TablePreview

    async function handleDelete(id){
        console.log("coucou id = ", id);
        await axios
            .delete(`http://localhost:3002/table/${id}`, config)
            .then(res => {
                setMessage(res.data)
            })
            .catch(err => {
                console.log("handleDelete err", err.response);
            })
    }

    // Récupération de la saisie du restaurateur puis création de la 
    // table et enregistrement dans la DB 

    function handleChange(e) {
        e.preventDefault();
        setTable({
            number:e.target.value
        })
        console.log("table dans change = ",table );
    }

    async function handleSubmit(e) {
        e.preventDefault()

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

    // fonction permettant d'afficher ou non le formulaire 
    // pour ajouter une table

    const addTable = () => {
        if (display) {
            setDisplay(false)
        } else {
            setDisplay(true)
        }
    }

    return (

       <div className="publish-container">
            <div className='table-title'>
                <h1>Tables</h1>
                {!display ? <button onClick={addTable} >Ajouter une table</button> : <button onClick={addTable}>Annuler</button>}
            </div>

            {display 
            &&  <NewTableForm
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    bouton='Ajouter une table'
                />}
            <span style={{color:"#ff0000"}}>{message}</span>
            <div>
                {[tables.map(
                    (table) => (
                        <TablePreview
                            key={table.number}
                            table={table}
                            onDelete={handleDelete}
                        />
                    )
                )]}
            </div>
        </div>
    );
}

export default Table;


